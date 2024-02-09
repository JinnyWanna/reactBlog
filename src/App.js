// /* eslint-disable */

import './App.css';
import { useState } from "react";



function App() {
  let [글제목, 글제목변경] = useState(['남자코트 추천', '강남우동 맛집', '파이썬독학']);
  let [좋아요, 좋아요변경] = useState([0, 0, 0]);

  let [title, setTitle] = useState(0);
  let [modal, setModal] = useState(false);
  let [useInput, setInput] = useState('');

  return (
    <div className="App">
      <div className="black-nav">
        <h3>React Blog</h3>
      </div>

      <button onClick={() => {
        let copy = [...글제목];
        copy[0] = '여자코트 추천';
        글제목변경(copy);
      }}>글수정</button>

      <button onClick={() => {
        let copy = [...글제목];
        copy.sort();
        글제목변경(copy);
      }}>글 가나다순 정렬</button>

      {
        글제목.map(function (a, i) { // i는 index a는 자료
          return (
            <div className="list" key={i}>
              <h4 className="icon" onClick={() => {
                (title === i && modal) ? setModal(false): 
                ( (title !== i && modal) ? setTitle(i) : 
                (()=>{setModal(true); setTitle(i);})() ); 
              }}>
                {글제목[i]}
              </h4>
              <span className="id" onClick={() => {
                let copy = [...좋아요];
                copy[i] += 1;
                좋아요변경(copy);
              }}>👍
              </span> {좋아요[i]}
              <p>2월 17일 발행</p>
              <button onClick = {()=>{
                let copy_글제목 = [...글제목];
                let copy_좋아요 = [...좋아요];
                copy_글제목.splice(i,1);
                copy_좋아요.splice(i,1);
                글제목변경(copy_글제목);
                좋아요변경(copy_좋아요);
              }}>글삭제</button>
            </div>
          )
        })
      }
      <div>
        <input onChange = {(event) => { setInput(event.target.value) }}

        />
        <button onClick = {()=>{         
            let copy_글제목 = [...글제목];
            let copy_좋아요 = [...좋아요];
            copy_글제목.unshift(useInput);
            copy_좋아요.unshift(0);
            글제목변경(copy_글제목);
            좋아요변경(copy_좋아요);
        }}>글등록</button>
      </div>
      { // if문 for문 사용 불가능 html 작성 공간임 / 대신 삼항연산자 사용
        modal ? <Modal title={title} 글제목={글제목} 글제목변경={글제목변경} /> : null
      }

    </div>
  );
}


function Modal(props) {
  return (
    <div className="modal">
      <h4>{props.글제목[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={() => {
        let copy = [...props.글제목];
        copy[props.title] = '여자코트 추천';
        props.글제목변경(copy);
      }}>글 수정</button>
    </div>
  )
}
// 옛날 클래스로 컴포넌트 만들기

// class Modal2 extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       name : 'kim',
//       age : 20
//     }
//   }

//   render(){
//     return (
//       <div>안녕 { this.state.age }
//         <button onClick={()=>{ this.setState({age : 21}) }}>버튼</button>
//       </div>
//     )
//   }

// }

// return 안에 html 병렬기입하려면 맨위 맨 아래에 <></>써주면 됨

export default App;


// 리액트에서 모든 자료는 {}이 형태로 옮긴다. 단일 자료씩만 옮길수 있다.(1함수, 1변수 ...)