/** @format */

import { BASE_URL } from "../constants";
// import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { snackbar } from "../service";
import { loader } from "react-global-loader"


/** @format */





export class CrudFactory {
    dateFormat = "MMMM Do YYYY hh:mm A";
    BASE_URL = BASE_URL;

    getUrl = async (...segments) => {
        return segments.reduce((url, segment) => url + segment);
    };

    async get(url, data = {}, requestOptions = {}) {
        return this.send({
            method: "GET",
            url: `${this.BASE_URL}${url}`,
            data,
            ...requestOptions,
        });
    }

    async post(url, data = {}, requestOptions = {}) {
        return this.send({
            method: "POST",
            url: `${this.BASE_URL}${url}`,
            data,
            ...requestOptions,
        });
    }

    async create(url, data = {}, requestOptions = {}) {
        return this.send({
            method: "POST",
            url: `${this.BASE_URL}create/${url}`,
            data,
            ...requestOptions,
        });
    }

    async retrieve(url, data = {}, requestOptions = {}) {
        return this.send({
            method: "GET",
            url: `${this.BASE_URL}retrieve/${url}`,
            data,
            ...requestOptions,
        });
    }

    async update(url, data = {}, requestOptions = {}) {
        return this.send({
            method: "PUT",
            url: `${this.BASE_URL}update/${url}`,
            data,
            ...requestOptions,
        });
    }

    async delete(url, data = {}, requestOptions = {}) {
        return this.send({
            method: "DELETE",
            url: `${this.BASE_URL}delete/${url}`,
            data,
            ...requestOptions,
        });
    }

    async notify({
        message,
        type,
    }) {
        if (message && type === 'error') {
            snackbar(message, type);
        }
    }

    async send(requestOptions = {}) {

        const { url, data, method, notify = true } = requestOptions;

        const options = {
            ...requestOptions.ajaxOptions,
            method,
            data
        };

        let fullUrl = await this.getUrl(url);;
        let token = localStorage.getItem("accessToken");

        options.headers = {
            ...options.headers,
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420"
        };

        if (options.method === "GET") {
            const queryString = new URLSearchParams(data);
            fullUrl += `?${queryString}`;
        }

        let res = {
            data: [],
            message: "",
            type: "error",
            errors: [],
        };
        const finalOptions = {
            ...options,
            url: fullUrl,
            validateStatus: (status) => status === 200 || status === 401 || status === 422
        }
        try {
            loader.show();

            const response = await axios(finalOptions);

            if (response.status === 200) {
                res = response.data;
                const { type, message } = res;
                // ok
                if (options.method !== "GET" && notify) {
                    this.notify({
                        message,
                        type,
                    });
                }
            }
            else if (response.status === 401) {
                res = response.data;
                const { type, message } = res;
                // unauthorize
                this.notify({
                    message: message,
                    type: "error",
                });
            }
            else if (response.status === 422) {
                res = response.data;
                const { type, errors } = res;
                // incomplete data
                this.notify({
                    message: Object.values(errors)[0][0],
                    type: "error",
                });
            }
            else {
                throw new Error(`${response.status} : ${response.statusText}`);
            }
        } catch (e) {
            this.notify({
                message: 'Something went wrong at our end.',
                type: "error",
            });
            throw e;
        } finally {
            loader.hide();
        }

        const { type } = res;

        if (type === "error") throw res;

        return res;
    }
}


export const $crud = new CrudFactory();
