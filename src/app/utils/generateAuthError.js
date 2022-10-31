export const generateAuthError = (message) => {
    switch (message) {
    case 'INVALID_PASSWORD':
        return 'Неверный пароль'
    case 'EMAIL_NOT_FOUND':
        return 'Пользователя с таким Email не существует'
    case 'EMAIL_EXISTS':
        return 'Пользователь с таким Email уже существует'
    default:
        return 'Слишком много попыток входа, попробуйте позже'
    }
}
