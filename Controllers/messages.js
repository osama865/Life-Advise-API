// todo change these dummy messages to smart error handlers

const OK = {
    message: `You are authenticated, you can use the api as you want.`,
    secret: "i'm the secret flag, only choosen like you will obtain me.",
    status: 200,
};
const NotOK = {
    message: `You are not authenticated, you can't use this api.`,
    secret: "i'm the secret flag, only choosen will obtain me.",
    status: 403,
    // not authorised
};

const alreadyUsed = {
    message: `"This username or email is already in use!"`,
    status: 409,
    // not authorised
};

const noAdvicesForAuthor = {
    message: `Sorry but there is no quotes or advice said by this author .`,
    status: 600,
    // 600 for nod quotes found for this author
};

const noAdvicesForLang = {
    message: `Sorry but there is no quotes or advice in this language .`,
    status: 601,
    // 601 for nod quotes found for this language
};

const error = {
    message: "Sorry, some error happend",
    error: "",
    status: 404,
};

exports.messages = (status) => {
    switch (status) {
        case 403:
            return error;

        case 600:
            return noAdvicesForAuthor;

        case 601:
            return noAdvicesForLang;

        case 200:
            return OK;

        case 404:
            return NotOK;

        case 409:
            return alreadyUsed;
        default:
            break;
    }
};
