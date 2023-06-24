import React, { useState } from 'react'
import '../src/App.scss'
import axios from 'axios'


const App = () => {

  const [data, setData] = useState([]);

  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [brend_img, setBrend_img] = useState("");
  const [brend, setBrend] = useState("");
  const [promt, setPromt] = useState("");
  const [price_promt, setPrice_promt] = useState("");
  const [no_promt, setNo_promt] = useState("");


  React.useEffect(() => {
    axios
      .get("https://upg-api.onrender.com/upg")
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  })

  const createDevice = (e) => {
    e.preventDefault();
    axios
      .post("https://upg-api.onrender.com/upg", {
        img1: img1,
        img2: img2,
        img3: img3,
        img4: img4,
        desc: desc,
        category: category,
        brend_img: brend_img,
        brend: brend,
        promt: promt,
        price_promt: price_promt,
        no_promt: no_promt,
      })
      .then((res) => {
        console.log(res.data);
        alert("Device created!");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const PatchElements = async (_id) => {
    await axios.patch(
      (`https://upg-api.onrender.com/upg/${_id}`),
      {
        img1: img1,
        img2: img2,
        img3: img3,
        img4: img4,
        desc: desc,
        category: category,
        brend_img: brend_img,
        brend: brend,
        promt: promt,
        price_promt: price_promt,
        no_promt: no_promt,
      }
    );
    window.location.reload();
  };

  const AdminDelete = async (_id) => {
    try {
      const res = await axios.delete(`https://upg-api.onrender.com/upg/${_id}`)
        .then(() => window.location.reload());
      console.log("Data deleted");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className='all'>
      <div className="input--all">
        <input
          value={desc}
          placeholder='Название товара'
          onChange={(e) => setDesc(e.target.value)}
          type="text"
        />
        <input
          required
          value={img1}
          placeholder='img 1'
          onChange={(e) => setImg1(e.target.value)}
          type="text"
        />
        <input
          required
          value={img2}
          placeholder='img 2'
          onChange={(e) => setImg2(e.target.value)}
          type='url'
        />
        <input
          required
          value={img3}
          placeholder='img 3'
          onChange={(e) => setImg3(e.target.value)}
          type='url'
        />
        <input
          required
          value={img4}
          placeholder='img 4'
          onChange={(e) => setImg4(e.target.value)}
          type="text"
        />
        <input
          required
          value={category}
          placeholder='category'
          onChange={(e) => setCategory(e.target.value)}
          type="text"
        />
        <input
          required
          value={brend_img}
          placeholder='brend img'
          onChange={(e) => setBrend_img(e.target.value)}
          type="text"
        />
        <input
          required
          value={brend}
          placeholder='brend nomi'
          onChange={(e) => setBrend(e.target.value)}
          type="text"
        />
        <input
          required
          value={promt}
          placeholder='aksiya est'
          onChange={(e) => setPromt(e.target.value)}
          type="text"
        />
        <input
          required
          value={price_promt}
          placeholder='sena bez skidkoy'
          onChange={(e) => setPrice_promt(e.target.value)}
          type="number"
        />
        <input
          required
          value={no_promt}
          placeholder='sena s skidki'
          onChange={(e) => setNo_promt(e.target.value)}
          type="text"
        />
        <button required onClick={createDevice} className='save__product'>
          save product
        </button>
      </div>
      <div className='admin--all'>
        {data?.map((el) => {
          return (
            <div className="card" key={el._id}>
              <div className="img_block">
                <img className='img1' src={el.img1} alt="" />
                <img className='img2' src={el.img2} alt="" />
                <img className='img3' src={el.img3} alt="" />
                <img className='img4' src={el.img4} alt="" />
                <img className='brend_img' src={el.brend_img} alt="" />
              </div>
              <div className="text_block">
                <h1 className='desc'><b>desc:</b>{el.desc}</h1>
                <h1 className='category'><b>category:</b>{el.category}</h1>
                <h1 className='brend'><b>brend:</b>{el.brend}</h1>
                <h1 className='promt'><b>promt:</b>{el.promt}</h1>
              </div>
              <div className="number_block">
                <h1 className='price_promt'><b>price_promt:</b>{el.price_promt}</h1>
                <h1 className='no_promt'><b>no_promt:</b>{el.no_promt}</h1>
              </div>
              <ul>
                <button onClick={() => AdminDelete(el._id)}>удалить</button>
                <button onClick={() => PatchElements(el._id)}>поменять</button>
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App