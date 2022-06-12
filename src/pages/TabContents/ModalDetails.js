import React from 'react';
import '../../resoure/css/ModalDetails.css';

const ModalDetails = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    // <div className="modal-dialog modal-lg">
    <div className={open ? 'openModal modalDetails' : 'modalDetails'}>
      {open ? (
        <section>
          <header>
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>{props.children}</main>
        </section>
      ) : null}
    </div>
    // </div>
  );
};

export default ModalDetails;