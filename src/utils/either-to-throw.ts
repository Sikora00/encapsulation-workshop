import { Either, isLeft } from 'fp-ts/Either';

export function eitherToThrow<T>(either: Either<unknown, T>): T {
  if (isLeft(either)) {
    throw either.left;
  } else {
    return either.right;
  }
}
