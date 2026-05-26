import { jest } from "@jest/globals";

/**
 * Mock MySQL connection (mysql2/promise style)
 */
export const dbMock = {
    query: jest.fn(),
};