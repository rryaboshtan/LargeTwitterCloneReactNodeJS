import { call, put, takeLatest} from 'redux-saga/effects'
import { TweetsApi } from '../../../services/api/tweetsApi';
import {setTweets, setTweetsLoadingState, addTweet, setAddFormState
} from './actionCreators';
import { FetchAddTweetActionInterface, TweetsActionsType } from './contracts/actionTypes';
import { AddFormState, LoadingState, Tweet } from './contracts/state';

export function* fetchTweetsRequest(): any {
  try {
    const items = yield call(TweetsApi.fetchTweets);
    yield put(setTweets(items));
  } catch (error) {
    yield put(setTweetsLoadingState(LoadingState.ERROR));
  }
}

export function* fetchAddTweetRequest({payload}: FetchAddTweetActionInterface): any {
  try {
    const data:Tweet = {
      _id: Math.random().toString(36).substr(2),
      text: payload,
      "user": {
        "fullname": "Test user 3",
        "username": "Test 3",
        "avatarUrl": "https://source.unsplash.com/random/100x100?5"
      },
    };
    const item = yield call(TweetsApi.addTweet, data);
    yield put(addTweet(item));
  } catch (error) {
    yield put(setTweetsLoadingState(LoadingState.ERROR));
    console.log('Add form ERROR');
    yield put(setAddFormState(AddFormState.ERROR));
  }
}

export function* tweetsSaga() {
  yield takeLatest(TweetsActionsType.FETCH_TWEETS, fetchTweetsRequest);
  yield takeLatest(TweetsActionsType.FETCH_ADD_TWEET, fetchAddTweetRequest);

}



