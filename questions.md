1. What is the difference between Component and PureComponent?
   Give an example where it might break my app.

   In class components, we can extend Component or PureComponent.
   The difference is that Component will rerender if its parent has updated, even if the state or props haven't updated. PureComponent has an advanced comparison in shouldComponentUpdate that checks if state or props have changed.
   For function components we can use `React.memo` to prevent unnecessary rerenders. Also using `useCallback` and `useMemo` prevents the component from defining values unnecessarily.
   It might break my app when rendering a large list of components. This can cause to temporary freeze.

2. Context + ShouldComponentUpdate might be dangerous. Why is that?

   Context is used for passing props all over the react tree, and the components using it can be rerendered unnecessarily. The problem with using it with `shouldComponentUpdate` is that we should cover all the comparison. If not, the component might not render when it should.

   In any case, `shouldComponentUpdate` should be treated as "Why should we NOT render?" and not "Why should we render?"

   But as we are in 2024 and React 18, we have the magic behind function components that covers all the problems if you know how to use it.

3. Describe 3 ways to pass information from a component to its PARENT.

   1. Callback functions that are passed from parent to child.
   2. React Context APi
   3. Lifting the state to the parent and passing the "setState" function to child

4. Give 2 ways to prevent components from re-rendering.

   1. using `shouldComponentUpdate` in class components
   2. using `memo` in function components

5. What is a fragment and why do we need it? Give an example where it might break my app.

   The Fragment is a React defined component that renders only the children. We might need it to group multiple components in one, while not adding a new element to the DOM.

   The problem comes because it's not a real DOM element, and it could interfere with styling.

6. Give 3 examples of the HOC pattern.
   Higher Order Components are used to modify or return a new component based on another.

   1. Error boundary - would return the same component, but in case it catches an error, it will render another component.
   2. `connect` HOC from React Redux - uses context for providing mapStateToProps and mapDispatchToProps to the class component
   3. `withRouter` from react-router - gives component context of history and other params of current state of routing

7. What's the difference in handling exceptions in promises, callbacks and async...await?

   - Promises - can be used with `.then` and `.catch`, or `try{} catch{}`.
     If we manually create a promise, we execute `resolve()` or `reject()` callbacks
   - Callbacks - should be manually treated, for example sending params `onSuccess`, `onError`
   - async/await - can also be catched with `try{} catch{}`, but while an async function is also a promise, we can also use `.then` and `.catch`, along with `.finally`

8. How many arguments does setState take and why is it async.
   `setState` accepts two arguments. The first one can be the new value, or a callback function that gives prev value to work with. The second argument is a callback function that is called after the state is set.

   setState is Async for performance reasons. When doing many setStates in same scope, React will group all the setStates and do only one rerender at the end. This is made to ensure that the execution of javascript won't be freezed.

9. List the steps needed to migrate a Class to Function Component.

   1. Start with basics, Create a function component
   2. change `this.state` to proper `useState` hooks
   3. change `this.props` to proper props in function params
   4. If needed, remove `constructor` and move the defaults to `useState`s
   5. Change all lifecycle methods to proper `useEffect` hooks
   6. Change the render method from `render(){return </>}` to `return </>`

10. List a few ways styles can be used with components.

    - inlist styles, adde to `style` prop of the element
    - adding a className and importing proper CSS file
    - using CSS modules, like `className={style.header}`
    - using styled-components

11. How to render an HTML string coming from the server.
    We can achieve this by using dangerouslySetInnerHTML, but there is a reason why it's named `dangerouslySetInnerHTML`.

    If the new html contains executing scripts, it can cause major risks.
    It's named XSS, and there are several ways to remove the unnecessary scripts.

    ```jsx
    const rendered = <div dangerouslySetInnerHTML={{ __html: newHtml }} />;
    ```
