/*!
 * Name: bootstrap-modal-js
 * Version: 0.0.1-alpha.beta
 * Author: 张成林
 * Email: 469946668@qq.com
 * Description: Bootstrap modal
 * Copyright (c) 2019 张成林
 * Licenses: MIT
 * under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 * GitHub: https://github.com/zhangchenglin/bootstrap-modal-js
 */

function bootstrapModalJs(title, body, footer, ModalSizes, VerticallyCentered, LongContentType, EventType, CallbackFunction, Options) {
    title = title ? (typeof title === "string" ? title : typeof title === "function" ? title() + "" : "") : "";
    body = body ? (typeof body === "string" ? body : typeof body === "function" ? body() + "" : "") : "";
    footer = footer ? (typeof footer === "string" ? footer : typeof footer === "function" ? footer() + "" : "") : "";
    ModalSizes = ModalSizes && typeof ModalSizes !== "undefined" && typeof ModalSizes !== "boolean" ? ModalSizes : "default";
    VerticallyCentered = VerticallyCentered && typeof VerticallyCentered === "boolean" ? VerticallyCentered : false;
    LongContentType = LongContentType && typeof LongContentType === "boolean" ? LongContentType : false;
    EventType = EventType && typeof EventType === "string" ? EventType : "";
    CallbackFunction = CallbackFunction && typeof CallbackFunction === "function" ? CallbackFunction : "";
    Options = Options && typeof Options === "object" ? Options : "";

    const document_body = document.querySelector("body");
    const TimeID = new Date().getTime();
    const modal_ID = "Modal_" + TimeID;
    const modal_title_ID = "modalTitle_" + TimeID;
    const modal = document.createElement("div");
    const modal_dialog = document.createElement("div");
    const modal_content = document.createElement("div");
    const modal_header = document.createElement("div");
    const modal_title = document.createElement("h5");
    const modal_close_btn = document.createElement("button");
    const modal_close_span = document.createElement("span");
    const modal_body = document.createElement("div");
    const modal_footer = document.createElement("div");

    modal.id = modal_ID;
    modal.className = "modal fade";
    modal.tabIndex = "-1";
    modal.role = "dialog";
    modal.setAttribute("aria-hidden", "true");

    modal_dialog.className = "modal-dialog";
    switch (ModalSizes) {
        case "default":
            break;
        case "sm":
            modal_dialog.className += " modal-sm";
            break;
        case "lg":
            modal_dialog.className += " modal-lg";
            break;
        case "xl":
            modal_dialog.className += " modal-xl";
            break;
        default:
            modal_dialog.className += " " + ModalSizes;
    }

    switch (VerticallyCentered) {
        case true:
            modal_dialog.className += " modal-dialog-centered";
            break;
        case false:
        default:
    }

    switch (LongContentType) {
        case true:
            modal_dialog.className += " modal-dialog-scrollable";
            break;
        case false:
        default:
    }
    modal_dialog.role = "document";

    modal_content.className = "modal-content";

    modal_header.className = "modal-header";

    modal_title.id = modal_title_ID;
    modal_title.innerHTML = title;

    modal_close_btn.type = "button";
    modal_close_btn.className = "close";
    modal_close_btn.setAttribute("data-dismiss", "modal");//检查后期事件规则
    modal_close_btn.setAttribute("aria-label", "Close");

    modal_close_span.setAttribute("aria-hidden", "true");
    modal_close_span.innerHTML = "&times;";

    modal_body.className = "modal-body";
    modal_body.innerHTML = body;

    modal_footer.className = "modal-footer";
    modal_footer.innerHTML = footer;


    modal_close_btn.appendChild(modal_close_span);
    modal_header.appendChild(modal_title);
    modal_header.appendChild(modal_close_btn);
    modal_content.appendChild(modal_header);
    modal_content.appendChild(modal_body);
    footer ? modal_content.appendChild(modal_footer) : "";
    modal_dialog.appendChild(modal_content);
    modal.appendChild(modal_dialog);
    document_body.appendChild(modal);

    EventType && CallbackFunction ? bootstrap_modal_events(modal_ID, EventType, CallbackFunction) : "";

    $("#" + modal_ID).modal("show");
    removeBootstrapModal(modal_ID);
}

function removeBootstrapModal(modal_id) {
    const modal = document.querySelector("#" + modal_id);
    $("#" + modal_id).on("hidden.bs.modal", function () {
        setTimeout(function () {
            modal.parentElement.removeChild(modal);
        }, 2e3);
    });
}

function bootstrap_modal_events(modal_id, type, fun) {
    const modal = $("#" + modal_id);
    switch (type) {
        case "show":
            modal.on("show.bs.modal", function () {
                return fun();
            });
            break;
        case "shown":
            modal.on("shown.bs.modal", function () {
                return fun();
            });
            break;
        case "hide":
            modal.on("hide.bs.modal", function () {
                return fun();
            });
            break;
        case "hidden":
            modal.on("hidden.bs.modal", function () {
                return fun();
            });
            break;
        default:

    }

}