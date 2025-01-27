import { Link } from 'react-router-dom'

const Main = () => {
  return (
    <div>
        <Link to="/login">Login</Link>
        <br />
        <Link to="/register">Register</Link>

          <form className="form">
              <div className="form__group">
                  <label className="form__label">Name</label>
                  <input type="text" placeholder="Enter name" />
              </div>

              <div className="form__group">
                  <label className="form__label">Category</label>
                  <select>
                      <option>Select category</option>
                  </select>
              </div>
          </form>
    </div>
  )
}

export default Main