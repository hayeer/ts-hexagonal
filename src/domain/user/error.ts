const USERERR = {
    NOTFOUND: new Error('User not found'),
    CREATEFAILED: new Error('Failed to create new user'),
    UPDATEFAILED: new Error('Failed to update user data')
}

export default USERERR;
