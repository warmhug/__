import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import useEventCallback from './useEventCallback';
import usePrevious from './usePrevious';
import useIsMounted from './useIsMounted';
import Child from './Child';
import Reducer from './Reducer';

const Index = () => {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  const [text, updateText] = useState('');

  const prevCount = usePrevious(count);

  // 即便 `text` 变了也会被记住:
  const handleSubmit = useEventCallback(() => {
    alert(text);
  }, [text]);
  const handleSubmit1 = () => {
    alert(text)
  }

  const onAlert = useCallback(() => {
    setTimeout(() => {
      alert('Value: ' + count)
    }, 5000)
  }, [count])

  useEffect(() => {
    console.log('count change')
    return () => {
      console.log('count cleanup')
    }
  }, [count])

  async function fetchData() {
    const res = await new Promise((resolve) => {
      setTimeout(() => resolve(true), 3000);
    });
    if (res) {
      updateText('new');
    }
  }
  useEffect(() => {
    fetchData();
    setTimeout(() => setShow(true), 2000);
  }, []);

  return show ? (<div>
    <button onClick={() => setCount(count + 1)}>btn1 {count} {prevCount}</button>
    <button onClick={onAlert}>点我后，再点 btn1</button>
    <input value={text} onChange={e => updateText(e.target.value)} />
    <button onClick={handleSubmit}>提交</button>
    <Child onClick={handleSubmit} />
    {/* <Child onClick={handleSubmit1} /> */}
    <Reducer />
  </div>) : null;
}

ReactDOM.render(<Index /> , document.getElementById('example'));
