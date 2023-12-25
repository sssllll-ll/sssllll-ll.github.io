import { ComponentInternalInstance, getCurrentInstance } from 'vue';
// 添加断言
export default function useCurrentInstance(){
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy =appContext.config.globalProperties;
    return { proxy }
}