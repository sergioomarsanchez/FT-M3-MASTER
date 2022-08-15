'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
function $Promise(executor) {

    if (typeof executor !== "function") {
        throw new TypeError("Executor argument has to be a function!")
    }

    this._state = "pending"
    this._handlerGroups = []

    executor(this._internalResolve.bind(this), this._internalReject.bind(this))

}

$Promise.prototype._internalResolve = function (value) {

    if (this._state === "pending") {
        this._state = "fulfilled"
        this._value = value
        this._callHandler()
    }

}

$Promise.prototype._internalReject = function (value) {

    if (this._state === "pending") {
        this._state = "rejected"
        this._value = value
        this._callHandler()
    }

}

$Promise.prototype.then = function (sCb, eCb) {

    const downstreamPromise = new $Promise(() => { })

    this._handlerGroups.push({
        downstreamPromise,
        successCb: typeof sCb == "function" ? sCb : false,
        errorCb: typeof eCb == "function" ? eCb : false,
    })

    if (this._state !== "pending") this._callHandler()
    return downstreamPromise

}

$Promise.prototype.catch = function (eCb) {
    return this.then(null, eCb)
}

$Promise.prototype._callHandler = function () {

    while (this._handlerGroups.length) {

        const handlerGroup = this._handlerGroups.shift()

        if (this._state == "fulfilled") {

            if (handlerGroup.successCb) {

                try {

                    const result = handlerGroup.successCb(this._value)

                    if (result instanceof $Promise) {

                        return result.then(
                            data => handlerGroup.downstreamPromise._internalResolve(data),
                            error => handlerGroup.downstreamPromise._internalReject(error)
                        )

                    } else {
                        handlerGroup.downstreamPromise._internalResolve(result)
                    }
                } catch (e) {
                    handlerGroup.downstreamPromise._internalReject(e)
                }

            } else {
                handlerGroup.downstreamPromise._internalResolve(this._value)
            }

        } else if (this._state == "rejected") {

            if (handlerGroup.errorCb) {

                try {

                    const result = handlerGroup.errorCb(this._value)

                    if (result instanceof $Promise) {

                        return result.then(
                            data => handlerGroup.downstreamPromise._internalResolve(data),
                            error => handlerGroup.downstreamPromise._internalReject(error)
                        )

                    } else {
                        handlerGroup.downstreamPromise._internalResolve(result)
                    }
                } catch (e) {
                    handlerGroup.downstreamPromise._internalReject(e)
                }
            } else {
                handlerGroup.downstreamPromise._internalReject(this._value)
            }
        }

    }

}
module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
