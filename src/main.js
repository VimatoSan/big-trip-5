import Presenter from './presenter/presenter.js';
import Model from './model/model';
import {createMockData} from './mock/mocks.js';


const model = new Model(createMockData());
const presenter = new Presenter(model);
presenter.init();
