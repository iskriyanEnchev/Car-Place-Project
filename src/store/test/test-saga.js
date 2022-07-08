import {takeEvery, put} from 'redux-saga/effects';
import {testSuccess, testFailure} from './test-actions';

export function* fetchTest() {
  try {
    const response = yield fetch('https://api.chucknorris.io/jokes/random', {
      method: 'GET',
    });
    const resolvedContent = yield response.json();

    yield put(testSuccess(resolvedContent));
  } catch (error) {
    yield put(testFailure('Failed'));
  }
}

export function* fectTestStart() {
  yield takeEvery('TEST_START', fetchTest);
}