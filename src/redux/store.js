import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'
import logger from 'redux-logger'   //state값이 변할때마다 console.log()방식으로 변화과정을 찍어줌
import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'; //크롬 웹 redux확장 프로그램 설치 후 추적가능하게 해줌

const middleware = [logger, thunk]

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))

export default store;