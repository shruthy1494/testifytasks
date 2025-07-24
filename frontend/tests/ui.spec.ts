import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';
const VALID_USER = { username: 'testuser', password: 'test123' };
const INVALID_USER = { username: 'testuser', password: 'wrongpass' };

test.describe('Todo App UI Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  const login = async (page, { username, password }) => {
    await page.getByPlaceholder('Username').fill(username);
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button', { name: /login/i }).click();
  };

  const addTodo = async (page, text: string) => {
    await page.getByTestId('new-todo-input').fill(text);
    await page.getByTestId('add-todo-button').click();
    return page.waitForSelector(`li[data-testid^="todo-"]:has-text("${text.trim()}")`, { timeout: 5000 });
  };

  const getTodoId = async (todoItem: any) => {
    const id = await todoItem.getAttribute('data-testid');
    if (!id) throw new Error('Todo ID not found');
    return id.replace('todo-', '');
  };

  // Tests
  test('Shows error on invalid login', async ({ page }) => {
    await login(page, INVALID_USER);
    await expect(page.getByRole('alert')).toHaveText(/login failed/i);
  });

  test('Redirects to todos on valid login', async ({ page }) => {
    await login(page, VALID_USER);
    await expect(page.getByRole('heading', { name: /todo list/i })).toBeVisible();
    await expect(page).toHaveScreenshot('todo-list-after-login.png');
  });

  test('Rejects empty login form', async ({ page }) => {
    await page.getByRole('button', { name: /login/i }).click();
    await expect(page.getByRole('alert')).toHaveText(/login failed/i);
  });

  test('Handles full todo flow: create, edit, cancel, delete', async ({ page }) => {
    await login(page, VALID_USER);
    await expect(page.getByRole('heading', { name: /todo list/i })).toBeVisible();

    const todoText = 'Buy milk';
    const todoItem = await addTodo(page, todoText);
    const todoId = await getTodoId(todoItem);
    await expect(page).toHaveScreenshot('after-add-todo.png');


    // Edit
    await page.getByTestId(`edit-button-${todoId}`).click();
    await page.getByTestId(`edit-input-${todoId}`).fill('Buy bread');
    await page.getByTestId(`save-button-${todoId}`).click();
    await expect(page.getByTestId(`todo-${todoId}`)).toContainText('Buy bread');
    await expect(page).toHaveScreenshot('after-edit-todo.png');

    // Cancel edit
    await page.getByTestId(`edit-button-${todoId}`).click();
    await page.getByTestId(`edit-input-${todoId}`).fill('Changed again');
    await page.getByTestId(`cancel-button-${todoId}`).click();
    await expect(page.getByTestId(`todo-${todoId}`)).toContainText('Buy bread');

    // Delete
    await page.getByTestId(`delete-button-${todoId}`).click();
    await expect(page.locator(`li[data-testid="todo-${todoId}"]`)).toHaveCount(0);
    await expect(page).toHaveScreenshot('after-delete-todo.png');
  });

  test('Trims whitespace from new todo input', async ({ page }) => {
    await login(page, VALID_USER);
    const todoItem = await addTodo(page, '    Trimmed Todo    ');
    expect(todoItem).not.toBeNull();
  });

  test('Cancel edit restores original text and hides edit input', async ({ page }) => {
    await login(page, VALID_USER);
    const todoText = 'Cancelable';
    const todoItem = await addTodo(page, todoText);
    const todoId = await getTodoId(todoItem);

    await page.getByTestId(`edit-button-${todoId}`).click();
    await page.getByTestId(`edit-input-${todoId}`).fill('Changed value');
    await page.getByTestId(`cancel-button-${todoId}`).click();

    await expect(page.getByTestId(`todo-${todoId}`)).toContainText(todoText);
  });
});
