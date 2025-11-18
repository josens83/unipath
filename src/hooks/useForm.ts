import { useState, useCallback } from 'react';
import type { ChangeEvent } from 'react';

/**
 * 폼 검증 함수 타입
 */
export type ValidationRule<T> = {
  [K in keyof T]?: (value: T[K]) => string | null;
};

/**
 * 폼 상태 관리를 위한 커스텀 훅
 * 입력값 관리, 검증, 에러 처리를 통합 제공
 *
 * @example
 * const { values, errors, handleChange, handleSubmit, isValid } = useForm(
 *   { email: '', password: '' },
 *   {
 *     email: (value) => !value ? '이메일을 입력하세요' : null,
 *     password: (value) => value.length < 6 ? '비밀번호는 6자 이상이어야 합니다' : null,
 *   }
 * );
 *
 * <form onSubmit={handleSubmit(async (values) => await login(values))}>
 *   <input name="email" value={values.email} onChange={handleChange} />
 *   {errors.email && <span>{errors.email}</span>}
 * </form>
 */

export interface UseFormOptions {
  /** 폼 제출 시 검증 실패해도 실행 여부 */
  validateOnSubmit?: boolean;
  /** 입력 시 실시간 검증 여부 */
  validateOnChange?: boolean;
  /** blur 시 검증 여부 */
  validateOnBlur?: boolean;
}

export interface UseFormResult<T> {
  /** 현재 폼 값들 */
  values: T;
  /** 검증 에러 메시지들 */
  errors: Partial<Record<keyof T, string>>;
  /** 폼이 제출된 적 있는지 여부 */
  touched: Partial<Record<keyof T, boolean>>;
  /** 폼이 유효한지 여부 */
  isValid: boolean;
  /** 입력 변경 핸들러 */
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  /** blur 핸들러 */
  handleBlur: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  /** 특정 필드 값 업데이트 */
  setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void;
  /** 특정 필드 에러 설정 */
  setFieldError: <K extends keyof T>(field: K, error: string) => void;
  /** 폼 제출 핸들러 */
  handleSubmit: (
    onSubmit: (values: T) => void | Promise<void>
  ) => (e?: React.FormEvent) => Promise<void>;
  /** 폼 초기화 */
  reset: (newValues?: T) => void;
  /** 수동 검증 실행 */
  validate: () => boolean;
}

export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationRules: ValidationRule<T> = {},
  options: UseFormOptions = {}
): UseFormResult<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const validateField = useCallback(
    <K extends keyof T>(field: K, value: T[K]): string | null => {
      const rule = validationRules[field];
      return rule ? rule(value) : null;
    },
    [validationRules]
  );

  const validateAllFields = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(validationRules).forEach((key) => {
      const field = key as keyof T;
      const error = validateField(field, values[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validationRules, validateField]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      const field = name as keyof T;

      // checkbox 처리
      const newValue =
        type === 'checkbox' && 'checked' in e.target
          ? (e.target.checked as T[keyof T])
          : (value as T[keyof T]);

      setValues((prev) => ({ ...prev, [field]: newValue }));

      // 실시간 검증
      if (options.validateOnChange) {
        const error = validateField(field, newValue);
        setErrors((prev) => ({
          ...prev,
          [field]: error || undefined,
        }));
      }
    },
    [validateField, options.validateOnChange]
  );

  const handleBlur = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name } = e.target;
      const field = name as keyof T;

      setTouched((prev) => ({ ...prev, [field]: true }));

      // blur 시 검증
      if (options.validateOnBlur) {
        const error = validateField(field, values[field]);
        setErrors((prev) => ({
          ...prev,
          [field]: error || undefined,
        }));
      }
    },
    [values, validateField, options.validateOnBlur]
  );

  const setFieldValue = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const setFieldError = useCallback(<K extends keyof T>(field: K, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  }, []);

  const handleSubmit = useCallback(
    (onSubmit: (values: T) => void | Promise<void>) =>
      async (e?: React.FormEvent) => {
        e?.preventDefault();

        const isValid = options.validateOnSubmit !== false ? validateAllFields() : true;

        if (isValid || options.validateOnSubmit === false) {
          await onSubmit(values);
        }
      },
    [values, validateAllFields, options.validateOnSubmit]
  );

  const reset = useCallback((newValues?: T) => {
    setValues(newValues || initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldError,
    handleSubmit,
    reset,
    validate: validateAllFields,
  };
}
