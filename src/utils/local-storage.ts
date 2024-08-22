export function saveTokensToLocalStorage(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken.split(' ')[1]);
    localStorage.setItem('refreshToken', refreshToken);
}

export function clearTokensInLocalStorage() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
}

export function getAccessTokenFromLocalStorage() {
    return localStorage.getItem("accessToken");
}

export function getRefreshTokenFromLocalStorage() {
    return localStorage.getItem("refreshToken");
}

export function isPasswordResetRequested() {
    return 'true' === localStorage.getItem('passwordResetRequested');
}

export function setPasswordResetRequested() {
    localStorage.setItem('passwordResetRequested', "true");
}

export function clearPasswordResetRequested() {
    localStorage.removeItem('passwordResetRequested');
}
