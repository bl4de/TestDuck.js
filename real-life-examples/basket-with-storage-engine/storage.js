/**
 * Created by rafal.janicki on 2015-03-16.
 */
/*
 Storage Engine for StorePlus application
 stores data in web storage (localStorage/sessionStorage)
 */
angular.module('StorePlusApp')
    .service("StorageService", function () {
        return {
            storageTypes: ["memory", "local", "session"],

            storageType: "memory",  // "session", "memory"

            storage: {},

            setStorageType: function (type) {
                // set default storage type to "memory"
                this.storageType = "memory";

                // if 'type' exists, set to them:
                if (this.storageTypes.indexOf(type) > -1) {
                    this.storageType = type;
                }
            },

            setValue: function (key, value) {
                switch (this.storageType) {
                    case "memory" :
                    {
                        this.storage[key] = value;
                    }
                        break;

                    case "local" :
                    {
                        window.localStorage.setItem(key, value);
                    }
                        break;

                    case "session" :
                    {
                        window.sessionStorage.setItem(key, value);
                    }
                        break;
                }
            },

            getValue: function (key) {
                switch (this.storageType) {
                    case "memory" :
                    {
                        return this.storage[key];
                    }
                        break;

                    case "local" :
                    {
                        return window.localStorage.getItem(key);
                    }
                        break;

                    case "session" :
                    {
                        return window.sessionStorage.getItem(key);
                    }
                        break;
                }
            },

            clear: function () {
                this.storageType === "memory" ? this.storage = {} : this.storageType === "local" ? window.localStorage.clear() : window.sessionStorage.clear();
            }
        };
    });