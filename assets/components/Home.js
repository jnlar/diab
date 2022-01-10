import React, { useRef } from 'react';

function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
    console.log(inputEl);
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Click</button>
    </>
  );
}

const Home = () => {
  return (
    <div className="min-w-1/2 w-1/4 p-5 bg-neutral-300">
      <code className="text-xs">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer convallis dui odio, eget ullamcorper libero porta ut. Quisque sed scelerisque ex, sit amet semper erat. Donec malesuada sed arcu eu congue. Quisque id nunc sed massa convallis hendrerit et non odio. Etiam vitae interdum arcu. Fusce sed tincidunt urna. Phasellus iaculis leo ac lorem lacinia, et fermentum neque aliquet. Suspendisse dignissim vel purus vitae suscipit.
        Praesent at tristique justo. Curabitur luctus elementum massa, sit amet mollis nulla rhoncus at. Suspendisse luctus facilisis risus, sed imperdiet nunc tincidunt euismod. Donec dictum fermentum libero, nec molestie turpis vestibulum vitae. Fusce convallis lectus varius posuere semper. Phasellus egestas risus at purus posuere faucibus. Mauris neque nisl, porttitor in rutrum sit amet, semper eu metus. Duis ipsum orci, varius at lorem in, scelerisque gravida elit.
        Fusce augue purus, tempor et mauris placerat, porta maximus urna. Vestibulum non arcu non enim interdum condimentum egestas quis ante. Nunc sodales consequat nisi eu sollicitudin. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla pharetra vitae ipsum in blandit. Nam molestie a nulla sed ornare. Morbi vel faucibus elit. Integer interdum mauris vel elit lobortis venenatis. Suspendisse fringilla facilisis orci ac laoreet. Fusce venenatis quam sed congue elementum. Curabitur accumsan tristique justo ut feugiat. Integer ac consequat augue, ac pulvinar augue. In suscipit pharetra dui, vel tempus tellus bibendum vitae. Praesent et venenatis dolor. Suspendisse pulvinar, purus ut volutpat imperdiet, lectus ante finibus est, non ornare enim tortor a mi. Phasellus ante leo, faucibus sed aliquam nec, molestie et dolor.
      </code>
    </div>
  )
}

export default Home;

