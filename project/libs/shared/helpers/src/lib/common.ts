import { ClassTransformOptions, plainToInstance } from 'class-transformer';

type PlainObject<T> = Record<keyof T, unknown>;

export function fillDto<T, V extends Partial<PlainObject<T>>>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T;

export function fillDto<T, V extends Partial<PlainObject<T>>>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T[];

export function fillDto<T, V extends Partial<PlainObject<T>>>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T | T[] {
  return plainToInstance(DtoClass, plainObject, {
    excludeExtraneousValues: true,
    ...options,
  });
}
