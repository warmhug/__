/**
 *
 */
import { MainController } from './lib/MainController';
import { SearchService } from './lib/SearchService';
import { result as resultDirective } from './lib/resultDirective';

angular.module('app', [])
      .directive('result', resultDirective)
      .controller('mainController', MainController)
      .service('searchService', SearchService); 