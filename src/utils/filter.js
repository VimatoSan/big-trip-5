import {FilterTypes} from '../const';
import {durationToMinutes} from './time';

export const filter = {
  [FilterTypes.EVERYTHING]: (points) => points,
  [FilterTypes.PRESENT]: (points) => points.filter((p) => durationToMinutes(p.dateFrom, new Date()) > 0 && durationToMinutes(new Date(), p.dateTo) > 0),
  [FilterTypes.PAST]: (points) => points.filter((p) => durationToMinutes(p.dateTo, new Date()) > 0),
  [FilterTypes.FUTURE]: (points) => points.filter((p) => durationToMinutes(new Date(), p.dateFrom) > 0),
};
