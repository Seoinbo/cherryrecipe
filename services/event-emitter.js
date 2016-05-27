export class EventEmitter {
    constructor() {
        this._events = {};
        this._expires = {};
    }
    
    // event:string - 이벤트 이름
    // callback:function - 이벤트 발생 시 호출할 핸들러
    // expires:number - 몇 번 호출되고 제거 되는가?
    addEvent(event, callback, expires = 999999999) {
        if (this._events[event] instanceof Array) {
            this._events[event].push(callback);
        } else {
            this._events[event] = [callback];
        }
        this.eventExpires(event, expires);
    }
    
    // event:string - 삭제할 이벤트 이름
    removeEvent(event) {
        delete this._events[event];
        delete this._expires[event];
    }
    
    // event:string - 이벤트 이름
    // data:array - 이벤트 인자
    fireEvent(event, data, context) {
        if (typeof this._events[event] === "undefined") {
            return false;
        }
        if (this._expires[event] <= 0) {
            this.removeEvent(event);
            return false;
        }
        context = context || this;
        this._expires[event] -= 1;
        
        this._events[event].forEach( (callback, idx) => {
            if (Object.prototype.toString.call(data) === "[object Array]") {
                callback.apply(context, data);
            } else {
                callback.apply(context, [data]);
            }
        });
    }
    
    eventExpires(event, expires = 0) {
        this._expires[event] = expires;
    }
    
    clearEvent() {
        this._events = {};
    }
}
