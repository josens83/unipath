import { z } from 'zod';

// Login Schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요')
    .email('올바른 이메일 형식이 아닙니다'),
  password: z
    .string()
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Register Schema
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, '이름은 최소 2자 이상이어야 합니다')
    .max(50, '이름은 최대 50자까지 가능합니다'),
  email: z
    .string()
    .min(1, '이메일을 입력해주세요')
    .email('올바른 이메일 형식이 아닙니다'),
  password: z
    .string()
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다')
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)/,
      '비밀번호는 영문과 숫자를 포함해야 합니다'
    ),
  confirmPassword: z.string(),
  phone: z
    .string()
    .regex(/^010-\d{4}-\d{4}$/, '올바른 전화번호 형식이 아닙니다 (010-0000-0000)')
    .optional()
    .or(z.literal('')),
}).refine((data) => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['confirmPassword'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

// Profile Schema
export const profileSchema = z.object({
  name: z
    .string()
    .min(2, '이름은 최소 2자 이상이어야 합니다')
    .max(50, '이름은 최대 50자까지 가능합니다'),
  email: z
    .string()
    .email('올바른 이메일 형식이 아닙니다'),
  phone: z
    .string()
    .regex(/^010-\d{4}-\d{4}$/, '올바른 전화번호 형식이 아닙니다 (010-0000-0000)')
    .optional()
    .or(z.literal('')),
  school: z
    .string()
    .min(2, '학교명은 최소 2자 이상이어야 합니다')
    .optional()
    .or(z.literal('')),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

// Payment Schema
export const paymentSchema = z.object({
  cardNumber: z
    .string()
    .regex(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, '올바른 카드번호 형식이 아닙니다'),
  expiryDate: z
    .string()
    .regex(/^\d{2}\/\d{2}$/, 'MM/YY 형식으로 입력해주세요'),
  cvc: z
    .string()
    .regex(/^\d{3,4}$/, 'CVC는 3-4자리 숫자입니다'),
  cardholderName: z
    .string()
    .min(2, '카드 소유자 이름을 입력해주세요'),
  email: z
    .string()
    .email('올바른 이메일 형식이 아닙니다'),
  phone: z
    .string()
    .regex(/^010-\d{4}-\d{4}$/, '올바른 전화번호 형식이 아닙니다'),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, {
      message: '서비스 이용약관에 동의해주세요',
    }),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;

// Review Schema
export const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, '별점을 선택해주세요')
    .max(5, '별점은 최대 5점입니다'),
  comment: z
    .string()
    .min(10, '리뷰는 최소 10자 이상 작성해주세요')
    .max(500, '리뷰는 최대 500자까지 가능합니다'),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;

// Post Schema (Community)
export const postSchema = z.object({
  title: z
    .string()
    .min(5, '제목은 최소 5자 이상이어야 합니다')
    .max(100, '제목은 최대 100자까지 가능합니다'),
  content: z
    .string()
    .min(10, '내용은 최소 10자 이상 작성해주세요')
    .max(5000, '내용은 최대 5000자까지 가능합니다'),
  category: z.enum(['notice', 'free', 'success', 'qna'], {
    message: '카테고리를 선택해주세요',
  }),
  tags: z
    .array(z.string())
    .max(5, '태그는 최대 5개까지 추가할 수 있습니다')
    .optional(),
});

export type PostFormData = z.infer<typeof postSchema>;
