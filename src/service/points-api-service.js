import ApiService from '../framework/api-service.js';
import {RestMethods} from '../const.js';

export default class PointsApiService extends ApiService {

  get points() {
    return this._load({url: 'points'}).then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: RestMethods.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    return await ApiService.parseResponse(response);
  }

  adaptToClient(point) {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      isFavourite: point['is_favorite'],
      destinationId: point['destination'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];
    delete adaptedPoint['destination'];

    return adaptedPoint;
  }

  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: RestMethods.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    return await ApiService.parseResponse(response);
  }

  async deletePoint(point) {
    return await this._load({
      url: `points/${point.id}`,
      method: RestMethods.DELETE,
    });
  }

  #adaptToServer(point) {
    const adaptedPoint = {...point,
      'base_price': point.basePrice,
      'date_from': point.dateFrom,
      'date_to': point.dateTo,
      'is_favorite': point.isFavourite,
      'destination': point.destinationId
    };

    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavourite;
    delete adaptedPoint.destinationId;

    return adaptedPoint;
  }
}
