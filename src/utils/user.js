export const getUser = () => {
    const tokenUser = localStorage.getItem('tokenUser')
    if (tokenUser) {
        const token = JSON.parse(tokenUser)
        return {
            userId: token.userId,
            username: token.username,
            userAuth: token.userAuth
        }
    } else {
        return null
    }   
}
export const clearUserInfo = () => {
    localStorage.setItem('tokenUser', '')
}