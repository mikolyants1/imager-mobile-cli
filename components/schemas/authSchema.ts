import { z } from 'zod';

export const authSchema = z.object({
  login: z
    .string()
    .min(1, { message: 'Логин слишком короткий' })
    .email({ message: 'Неверный формат' })
    .default(''),
  password: z
    .string()
    .min(7, { message: 'Пароль должен содержать не менее 7 символов' })
    .default(''),
});