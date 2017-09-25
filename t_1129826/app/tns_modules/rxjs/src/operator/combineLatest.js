"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayObservable_1 = require("../observable/ArrayObservable");
var isArray_1 = require("../util/isArray");
var OuterSubscriber_1 = require("../OuterSubscriber");
var subscribeToResult_1 = require("../util/subscribeToResult");
var none = {};
/* tslint:enable:max-line-length */
/**
 * Combines multiple Observables to create an Observable whose values are
 * calculated from the latest values of each of its input Observables.
 *
 * <span class="informal">Whenever any input Observable emits a value, it
 * computes a formula using the latest values from all the inputs, then emits
 * the output of that formula.</span>
 *
 * <img src="./img/combineLatest.png" width="100%">
 *
 * `combineLatest` combines the values from this Observable with values from
 * Observables passed as arguments. This is done by subscribing to each
 * Observable, in order, and collecting an array of each of the most recent
 * values any time any of the input Observables emits, then either taking that
 * array and passing it as arguments to an optional `project` function and
 * emitting the return value of that, or just emitting the array of recent
 * values directly if there is no `project` function.
 *
 * @example <caption>Dynamically calculate the Body-Mass Index from an Observable of weight and one for height</caption>
 * var weight = Rx.Observable.of(70, 72, 76, 79, 75);
 * var height = Rx.Observable.of(1.76, 1.77, 1.78);
 * var bmi = weight.combineLatest(height, (w, h) => w / (h * h));
 * bmi.subscribe(x => console.log('BMI is ' + x));
 *
 * // With output to console:
 * // BMI is 24.212293388429753
 * // BMI is 23.93948099205209
 * // BMI is 23.671253629592222
 *
 * @see {@link combineAll}
 * @see {@link merge}
 * @see {@link withLatestFrom}
 *
 * @param {ObservableInput} other An input Observable to combine with the source
 * Observable. More than one input Observables may be given as argument.
 * @param {function} [project] An optional function to project the values from
 * the combined latest values into a new value on the output Observable.
 * @return {Observable} An Observable of projected values from the most recent
 * values from each input Observable, or an array of the most recent values from
 * each input Observable.
 * @method combineLatest
 * @owner Observable
 */
function combineLatest() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    var project = null;
    if (typeof observables[observables.length - 1] === 'function') {
        project = observables.pop();
    }
    // if the first and only other argument besides the resultSelector is an array
    // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
        observables = observables[0].slice();
    }
    observables.unshift(this);
    return this.lift.call(new ArrayObservable_1.ArrayObservable(observables), new CombineLatestOperator(project));
}
exports.combineLatest = combineLatest;
var CombineLatestOperator = (function () {
    function CombineLatestOperator(project) {
        this.project = project;
    }
    CombineLatestOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new CombineLatestSubscriber(subscriber, this.project));
    };
    return CombineLatestOperator;
}());
exports.CombineLatestOperator = CombineLatestOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var CombineLatestSubscriber = (function (_super) {
    __extends(CombineLatestSubscriber, _super);
    function CombineLatestSubscriber(destination, project) {
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.active = 0;
        _this.values = [];
        _this.observables = [];
        return _this;
    }
    CombineLatestSubscriber.prototype._next = function (observable) {
        this.values.push(none);
        this.observables.push(observable);
    };
    CombineLatestSubscriber.prototype._complete = function () {
        var observables = this.observables;
        var len = observables.length;
        if (len === 0) {
            this.destination.complete();
        }
        else {
            this.active = len;
            this.toRespond = len;
            for (var i = 0; i < len; i++) {
                var observable = observables[i];
                this.add(subscribeToResult_1.subscribeToResult(this, observable, observable, i));
            }
        }
    };
    CombineLatestSubscriber.prototype.notifyComplete = function (unused) {
        if ((this.active -= 1) === 0) {
            this.destination.complete();
        }
    };
    CombineLatestSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var values = this.values;
        var oldVal = values[outerIndex];
        var toRespond = !this.toRespond
            ? 0
            : oldVal === none ? --this.toRespond : this.toRespond;
        values[outerIndex] = innerValue;
        if (toRespond === 0) {
            if (this.project) {
                this._tryProject(values);
            }
            else {
                this.destination.next(values.slice());
            }
        }
    };
    CombineLatestSubscriber.prototype._tryProject = function (values) {
        var result;
        try {
            result = this.project.apply(this, values);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return CombineLatestSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.CombineLatestSubscriber = CombineLatestSubscriber;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tYmluZUxhdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbWJpbmVMYXRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxpRUFBZ0U7QUFDaEUsMkNBQTBDO0FBRzFDLHNEQUFxRDtBQUVyRCwrREFBOEQ7QUFDOUQsSUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBaUJoQixtQ0FBbUM7QUFFbkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBDRztBQUNIO0lBQXlELHFCQUU2QjtTQUY3QixVQUU2QixFQUY3QixxQkFFNkIsRUFGN0IsSUFFNkI7UUFGN0IsZ0NBRTZCOztJQUNwRixJQUFJLE9BQU8sR0FBaUMsSUFBSSxDQUFDO0lBQ2pELEVBQUUsQ0FBQyxDQUFDLE9BQU8sV0FBVyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztRQUM5RCxPQUFPLEdBQWlDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUM1RCxDQUFDO0lBRUQsOEVBQThFO0lBQzlFLDRFQUE0RTtJQUM1RSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxpQkFBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4RCxXQUFXLEdBQVMsV0FBVyxDQUFDLENBQUMsQ0FBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGlDQUFlLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQzlGLENBQUM7QUFqQkQsc0NBaUJDO0FBRUQ7SUFDRSwrQkFBb0IsT0FBc0M7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V0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUN4QyxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFTyw2Q0FBVyxHQUFuQixVQUFvQixNQUFhO1FBQy9CLElBQUksTUFBVyxDQUFDO1FBQ2hCLElBQUksQ0FBQztZQUNILE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1QixNQUFNLENBQUM7UUFDVCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNILDhCQUFDO0FBQUQsQ0FBQyxBQWpFRCxDQUFtRCxpQ0FBZSxHQWlFakU7QUFqRVksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2YWJsZUlucHV0IH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBBcnJheU9ic2VydmFibGUgfSBmcm9tICcuLi9vYnNlcnZhYmxlL0FycmF5T2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBpc0FycmF5IH0gZnJvbSAnLi4vdXRpbC9pc0FycmF5JztcbmltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgT3V0ZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vT3V0ZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IElubmVyU3Vic2NyaWJlciB9IGZyb20gJy4uL0lubmVyU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBzdWJzY3JpYmVUb1Jlc3VsdCB9IGZyb20gJy4uL3V0aWwvc3Vic2NyaWJlVG9SZXN1bHQnO1xuY29uc3Qgbm9uZSA9IHt9O1xuXG4vKiB0c2xpbnQ6ZGlzYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lTGF0ZXN0PFQsIFI+KHRoaXM6IE9ic2VydmFibGU8VD4sIHByb2plY3Q6ICh2MTogVCkgPT4gUik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUxhdGVzdDxULCBUMiwgUj4odGhpczogT2JzZXJ2YWJsZTxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHByb2plY3Q6ICh2MTogVCwgdjI6IFQyKSA9PiBSKTogT2JzZXJ2YWJsZTxSPjtcbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lTGF0ZXN0PFQsIFQyLCBUMywgUj4odGhpczogT2JzZXJ2YWJsZTxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCBwcm9qZWN0OiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzKSA9PiBSKTogT2JzZXJ2YWJsZTxSPjtcbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lTGF0ZXN0PFQsIFQyLCBUMywgVDQsIFI+KHRoaXM6IE9ic2VydmFibGU8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4sIHByb2plY3Q6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMsIHY0OiBUNCkgPT4gUik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUxhdGVzdDxULCBUMiwgVDMsIFQ0LCBUNSwgUj4odGhpczogT2JzZXJ2YWJsZTxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCB2NDogT2JzZXJ2YWJsZUlucHV0PFQ0PiwgdjU6IE9ic2VydmFibGVJbnB1dDxUNT4sIHByb2plY3Q6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMsIHY0OiBUNCwgdjU6IFQ1KSA9PiBSKTogT2JzZXJ2YWJsZTxSPjtcbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lTGF0ZXN0PFQsIFQyLCBUMywgVDQsIFQ1LCBUNiwgUj4odGhpczogT2JzZXJ2YWJsZTxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCB2NDogT2JzZXJ2YWJsZUlucHV0PFQ0PiwgdjU6IE9ic2VydmFibGVJbnB1dDxUNT4sIHY2OiBPYnNlcnZhYmxlSW5wdXQ8VDY+LCBwcm9qZWN0OiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCB2NDogVDQsIHY1OiBUNSwgdjY6IFQ2KSA9PiBSKTogT2JzZXJ2YWJsZTxSPiA7XG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUxhdGVzdDxULCBUMj4odGhpczogT2JzZXJ2YWJsZTxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4pOiBPYnNlcnZhYmxlPFtULCBUMl0+O1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVMYXRlc3Q8VCwgVDIsIFQzPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCB2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgdjM6IE9ic2VydmFibGVJbnB1dDxUMz4pOiBPYnNlcnZhYmxlPFtULCBUMiwgVDNdPjtcbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lTGF0ZXN0PFQsIFQyLCBUMywgVDQ+KHRoaXM6IE9ic2VydmFibGU8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4pOiBPYnNlcnZhYmxlPFtULCBUMiwgVDMsIFQ0XT47XG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUxhdGVzdDxULCBUMiwgVDMsIFQ0LCBUNT4odGhpczogT2JzZXJ2YWJsZTxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCB2NDogT2JzZXJ2YWJsZUlucHV0PFQ0PiwgdjU6IE9ic2VydmFibGVJbnB1dDxUNT4pOiBPYnNlcnZhYmxlPFtULCBUMiwgVDMsIFQ0LCBUNV0+O1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVMYXRlc3Q8VCwgVDIsIFQzLCBUNCwgVDUsIFQ2Pih0aGlzOiBPYnNlcnZhYmxlPFQ+LCB2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgdjM6IE9ic2VydmFibGVJbnB1dDxUMz4sIHY0OiBPYnNlcnZhYmxlSW5wdXQ8VDQ+LCB2NTogT2JzZXJ2YWJsZUlucHV0PFQ1PiwgdjY6IE9ic2VydmFibGVJbnB1dDxUNj4pOiBPYnNlcnZhYmxlPFtULCBUMiwgVDMsIFQ0LCBUNSwgVDZdPiA7XG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUxhdGVzdDxULCBSPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCAuLi5vYnNlcnZhYmxlczogQXJyYXk8T2JzZXJ2YWJsZUlucHV0PFQ+IHwgKCguLi52YWx1ZXM6IEFycmF5PFQ+KSA9PiBSKT4pOiBPYnNlcnZhYmxlPFI+O1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVMYXRlc3Q8VCwgUj4odGhpczogT2JzZXJ2YWJsZTxUPiwgYXJyYXk6IE9ic2VydmFibGVJbnB1dDxUPltdKTogT2JzZXJ2YWJsZTxBcnJheTxUPj47XG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUxhdGVzdDxULCBUT3RoZXIsIFI+KHRoaXM6IE9ic2VydmFibGU8VD4sIGFycmF5OiBPYnNlcnZhYmxlSW5wdXQ8VE90aGVyPltdLCBwcm9qZWN0OiAodjE6IFQsIC4uLnZhbHVlczogQXJyYXk8VE90aGVyPikgPT4gUik6IE9ic2VydmFibGU8Uj47XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuXG4vKipcbiAqIENvbWJpbmVzIG11bHRpcGxlIE9ic2VydmFibGVzIHRvIGNyZWF0ZSBhbiBPYnNlcnZhYmxlIHdob3NlIHZhbHVlcyBhcmVcbiAqIGNhbGN1bGF0ZWQgZnJvbSB0aGUgbGF0ZXN0IHZhbHVlcyBvZiBlYWNoIG9mIGl0cyBpbnB1dCBPYnNlcnZhYmxlcy5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+V2hlbmV2ZXIgYW55IGlucHV0IE9ic2VydmFibGUgZW1pdHMgYSB2YWx1ZSwgaXRcbiAqIGNvbXB1dGVzIGEgZm9ybXVsYSB1c2luZyB0aGUgbGF0ZXN0IHZhbHVlcyBmcm9tIGFsbCB0aGUgaW5wdXRzLCB0aGVuIGVtaXRzXG4gKiB0aGUgb3V0cHV0IG9mIHRoYXQgZm9ybXVsYS48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9jb21iaW5lTGF0ZXN0LnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGBjb21iaW5lTGF0ZXN0YCBjb21iaW5lcyB0aGUgdmFsdWVzIGZyb20gdGhpcyBPYnNlcnZhYmxlIHdpdGggdmFsdWVzIGZyb21cbiAqIE9ic2VydmFibGVzIHBhc3NlZCBhcyBhcmd1bWVudHMuIFRoaXMgaXMgZG9uZSBieSBzdWJzY3JpYmluZyB0byBlYWNoXG4gKiBPYnNlcnZhYmxlLCBpbiBvcmRlciwgYW5kIGNvbGxlY3RpbmcgYW4gYXJyYXkgb2YgZWFjaCBvZiB0aGUgbW9zdCByZWNlbnRcbiAqIHZhbHVlcyBhbnkgdGltZSBhbnkgb2YgdGhlIGlucHV0IE9ic2VydmFibGVzIGVtaXRzLCB0aGVuIGVpdGhlciB0YWtpbmcgdGhhdFxuICogYXJyYXkgYW5kIHBhc3NpbmcgaXQgYXMgYXJndW1lbnRzIHRvIGFuIG9wdGlvbmFsIGBwcm9qZWN0YCBmdW5jdGlvbiBhbmRcbiAqIGVtaXR0aW5nIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhhdCwgb3IganVzdCBlbWl0dGluZyB0aGUgYXJyYXkgb2YgcmVjZW50XG4gKiB2YWx1ZXMgZGlyZWN0bHkgaWYgdGhlcmUgaXMgbm8gYHByb2plY3RgIGZ1bmN0aW9uLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkR5bmFtaWNhbGx5IGNhbGN1bGF0ZSB0aGUgQm9keS1NYXNzIEluZGV4IGZyb20gYW4gT2JzZXJ2YWJsZSBvZiB3ZWlnaHQgYW5kIG9uZSBmb3IgaGVpZ2h0PC9jYXB0aW9uPlxuICogdmFyIHdlaWdodCA9IFJ4Lk9ic2VydmFibGUub2YoNzAsIDcyLCA3NiwgNzksIDc1KTtcbiAqIHZhciBoZWlnaHQgPSBSeC5PYnNlcnZhYmxlLm9mKDEuNzYsIDEuNzcsIDEuNzgpO1xuICogdmFyIGJtaSA9IHdlaWdodC5jb21iaW5lTGF0ZXN0KGhlaWdodCwgKHcsIGgpID0+IHcgLyAoaCAqIGgpKTtcbiAqIGJtaS5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZygnQk1JIGlzICcgKyB4KSk7XG4gKlxuICogLy8gV2l0aCBvdXRwdXQgdG8gY29uc29sZTpcbiAqIC8vIEJNSSBpcyAyNC4yMTIyOTMzODg0Mjk3NTNcbiAqIC8vIEJNSSBpcyAyMy45Mzk0ODA5OTIwNTIwOVxuICogLy8gQk1JIGlzIDIzLjY3MTI1MzYyOTU5MjIyMlxuICpcbiAqIEBzZWUge0BsaW5rIGNvbWJpbmVBbGx9XG4gKiBAc2VlIHtAbGluayBtZXJnZX1cbiAqIEBzZWUge0BsaW5rIHdpdGhMYXRlc3RGcm9tfVxuICpcbiAqIEBwYXJhbSB7T2JzZXJ2YWJsZUlucHV0fSBvdGhlciBBbiBpbnB1dCBPYnNlcnZhYmxlIHRvIGNvbWJpbmUgd2l0aCB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlLiBNb3JlIHRoYW4gb25lIGlucHV0IE9ic2VydmFibGVzIG1heSBiZSBnaXZlbiBhcyBhcmd1bWVudC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IFtwcm9qZWN0XSBBbiBvcHRpb25hbCBmdW5jdGlvbiB0byBwcm9qZWN0IHRoZSB2YWx1ZXMgZnJvbVxuICogdGhlIGNvbWJpbmVkIGxhdGVzdCB2YWx1ZXMgaW50byBhIG5ldyB2YWx1ZSBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGUuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIG9mIHByb2plY3RlZCB2YWx1ZXMgZnJvbSB0aGUgbW9zdCByZWNlbnRcbiAqIHZhbHVlcyBmcm9tIGVhY2ggaW5wdXQgT2JzZXJ2YWJsZSwgb3IgYW4gYXJyYXkgb2YgdGhlIG1vc3QgcmVjZW50IHZhbHVlcyBmcm9tXG4gKiBlYWNoIGlucHV0IE9ic2VydmFibGUuXG4gKiBAbWV0aG9kIGNvbWJpbmVMYXRlc3RcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lTGF0ZXN0PFQsIFI+KHRoaXM6IE9ic2VydmFibGU8VD4sIC4uLm9ic2VydmFibGVzOiBBcnJheTxPYnNlcnZhYmxlSW5wdXQ8YW55PiB8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXJyYXk8T2JzZXJ2YWJsZUlucHV0PGFueT4+IHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKC4uLnZhbHVlczogQXJyYXk8YW55PikgPT4gUik+KTogT2JzZXJ2YWJsZTxSPiB7XG4gIGxldCBwcm9qZWN0OiAoLi4udmFsdWVzOiBBcnJheTxhbnk+KSA9PiBSID0gbnVsbDtcbiAgaWYgKHR5cGVvZiBvYnNlcnZhYmxlc1tvYnNlcnZhYmxlcy5sZW5ndGggLSAxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHByb2plY3QgPSA8KC4uLnZhbHVlczogQXJyYXk8YW55PikgPT4gUj5vYnNlcnZhYmxlcy5wb3AoKTtcbiAgfVxuXG4gIC8vIGlmIHRoZSBmaXJzdCBhbmQgb25seSBvdGhlciBhcmd1bWVudCBiZXNpZGVzIHRoZSByZXN1bHRTZWxlY3RvciBpcyBhbiBhcnJheVxuICAvLyBhc3N1bWUgaXQncyBiZWVuIGNhbGxlZCB3aXRoIGBjb21iaW5lTGF0ZXN0KFtvYnMxLCBvYnMyLCBvYnMzXSwgcHJvamVjdClgXG4gIGlmIChvYnNlcnZhYmxlcy5sZW5ndGggPT09IDEgJiYgaXNBcnJheShvYnNlcnZhYmxlc1swXSkpIHtcbiAgICBvYnNlcnZhYmxlcyA9ICg8YW55Pm9ic2VydmFibGVzWzBdKS5zbGljZSgpO1xuICB9XG5cbiAgb2JzZXJ2YWJsZXMudW5zaGlmdCh0aGlzKTtcblxuICByZXR1cm4gdGhpcy5saWZ0LmNhbGwobmV3IEFycmF5T2JzZXJ2YWJsZShvYnNlcnZhYmxlcyksIG5ldyBDb21iaW5lTGF0ZXN0T3BlcmF0b3IocHJvamVjdCkpO1xufVxuXG5leHBvcnQgY2xhc3MgQ29tYmluZUxhdGVzdE9wZXJhdG9yPFQsIFI+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgUj4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHByb2plY3Q/OiAoLi4udmFsdWVzOiBBcnJheTxhbnk+KSA9PiBSKSB7XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8Uj4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgQ29tYmluZUxhdGVzdFN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5wcm9qZWN0KSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmV4cG9ydCBjbGFzcyBDb21iaW5lTGF0ZXN0U3Vic2NyaWJlcjxULCBSPiBleHRlbmRzIE91dGVyU3Vic2NyaWJlcjxULCBSPiB7XG4gIHByaXZhdGUgYWN0aXZlOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIHZhbHVlczogYW55W10gPSBbXTtcbiAgcHJpdmF0ZSBvYnNlcnZhYmxlczogYW55W10gPSBbXTtcbiAgcHJpdmF0ZSB0b1Jlc3BvbmQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxSPiwgcHJpdmF0ZSBwcm9qZWN0PzogKC4uLnZhbHVlczogQXJyYXk8YW55PikgPT4gUikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dChvYnNlcnZhYmxlOiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlcy5wdXNoKG5vbmUpO1xuICAgIHRoaXMub2JzZXJ2YWJsZXMucHVzaChvYnNlcnZhYmxlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY29tcGxldGUoKSB7XG4gICAgY29uc3Qgb2JzZXJ2YWJsZXMgPSB0aGlzLm9ic2VydmFibGVzO1xuICAgIGNvbnN0IGxlbiA9IG9ic2VydmFibGVzLmxlbmd0aDtcbiAgICBpZiAobGVuID09PSAwKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWN0aXZlID0gbGVuO1xuICAgICAgdGhpcy50b1Jlc3BvbmQgPSBsZW47XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGNvbnN0IG9ic2VydmFibGUgPSBvYnNlcnZhYmxlc1tpXTtcbiAgICAgICAgdGhpcy5hZGQoc3Vic2NyaWJlVG9SZXN1bHQodGhpcywgb2JzZXJ2YWJsZSwgb2JzZXJ2YWJsZSwgaSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5vdGlmeUNvbXBsZXRlKHVudXNlZDogU3Vic2NyaWJlcjxSPik6IHZvaWQge1xuICAgIGlmICgodGhpcy5hY3RpdmUgLT0gMSkgPT09IDApIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICB9XG4gIH1cblxuICBub3RpZnlOZXh0KG91dGVyVmFsdWU6IFQsIGlubmVyVmFsdWU6IFIsXG4gICAgICAgICAgICAgb3V0ZXJJbmRleDogbnVtYmVyLCBpbm5lckluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgaW5uZXJTdWI6IElubmVyU3Vic2NyaWJlcjxULCBSPik6IHZvaWQge1xuICAgIGNvbnN0IHZhbHVlcyA9IHRoaXMudmFsdWVzO1xuICAgIGNvbnN0IG9sZFZhbCA9IHZhbHVlc1tvdXRlckluZGV4XTtcbiAgICBjb25zdCB0b1Jlc3BvbmQgPSAhdGhpcy50b1Jlc3BvbmRcbiAgICAgID8gMFxuICAgICAgOiBvbGRWYWwgPT09IG5vbmUgPyAtLXRoaXMudG9SZXNwb25kIDogdGhpcy50b1Jlc3BvbmQ7XG4gICAgdmFsdWVzW291dGVySW5kZXhdID0gaW5uZXJWYWx1ZTtcblxuICAgIGlmICh0b1Jlc3BvbmQgPT09IDApIHtcbiAgICAgIGlmICh0aGlzLnByb2plY3QpIHtcbiAgICAgICAgdGhpcy5fdHJ5UHJvamVjdCh2YWx1ZXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHZhbHVlcy5zbGljZSgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF90cnlQcm9qZWN0KHZhbHVlczogYW55W10pIHtcbiAgICBsZXQgcmVzdWx0OiBhbnk7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IHRoaXMucHJvamVjdC5hcHBseSh0aGlzLCB2YWx1ZXMpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQocmVzdWx0KTtcbiAgfVxufVxuIl19