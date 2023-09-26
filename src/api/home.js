import request from '@/utils/request'
// 获取首页数据
export const getHomeData = () => {
  return request('/page/detail', {
    params: {
      pageId: 0
    }
  })
}
