'use strict';

import SimpleApiEventEmitter from './simple-api-event-emitter';
import SimpleApiModel from './simple-api-model';
import SimpleApiRoot from './simple-api-root';

angular.module('ngSimpleApi', [])

.provider('SimpleApiEventEmitter', SimpleApiEventEmitter)
.provider('SimpleApiModel', SimpleApiModel)
.provider('SimpleApiRoot', SimpleApiRoot);