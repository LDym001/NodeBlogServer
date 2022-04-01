### vue的生命周期（vue2和vue3）
vue的一个组件从创建到销毁共会经历四个生命周期:创建、挂载、更新、销毁
vue2生命周期钩子：
```js
1. create
    - beforeCreated
    - created
2. mount
    - beforeMounted
    - mounted
3. update
    - beforeUpdated
    - updated
4. destroy
    - beforeDestroy
    - destroyed
vue3生命周期钩子:
1. setup
2. mount
    - onBeforeMounted
    - onMounted
3. update
    - onBeforeUpdated
    - onUpdated
4. onUnmounted
```
#### 创建周期
组件实例创建前beforeCreated：此时组件实例刚刚被创建出来，但组件属性（如data）还未创建
实例创建之后created：此时组件实例创建完成，属性也已绑定，但尚未挂载到DOM树上，还未生成$el，此时组件尚不可见
> 该周期常用于组件生成前请求渲染数据
> 如在beforeCreated生命周期钩子里发送网络请求向服务器请求组件渲染数据
> 在vue3中create两个生命周期钩子被setup代替，若想在组件生成前向服务器请求组件渲染数据需要用到异步组件
#### 挂载周期
挂载前beforeMounted：该钩子在挂载前调用相关的render函数首次被调用，该钩子在服务端渲染不可调用
挂载后onMounted：el此时被vm.$el所替换，并将组件实例挂载到DOM树上，该钩子在服务端渲染不可调用
> 服务端渲染不可调用该mount生命周期钩子原因：服务端渲染直接在服务器上将组件渲染完毕，但服务器无法挂载DOM树上，因此该生命周期钩子无效，后面同理
#### 更新周期
更新前beforeUpdated：响应式数据更新引起视图更新前，该钩子执行在虚拟DOM进行diff计算前，该钩子在服务端渲染不可使用
更新后updated：视图更新完毕虚拟DOMdiff比较执行完后，该钩子需谨慎使用防止出现死循环，该钩子服务端渲染不可使用
#### 销毁周期
销毁前beforeDestroy：组件实例销毁前，此时组件实例依旧可以使用，服务端渲染不可用
销毁后Destroyed：组件实例被销毁后调用，组件实例所绑定的东西全部解绑，组件上的所有事件监听全部被移除，服务端渲染不可用