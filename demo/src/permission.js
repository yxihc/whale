import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({showSpinner: false});

const whiteList = ['/login', '/auth-redirect', '/bind', '/register', '/yxhc/ocr'];

router.beforeEach((to, from, next) => {
    NProgress.start()
    if (to.meta && to.meta.white) {
        NProgress.done()
        next()
        return
    }
    if (getToken()) {
        NProgress.done()
        next()
    } else {
        next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
        NProgress.done()
    }
})

router.afterEach(() => {
    NProgress.done()
})

function getToken() {
    return ''
}
