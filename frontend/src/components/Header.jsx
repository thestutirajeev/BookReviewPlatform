import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/users/userSlice';

export default function Header() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between">
      <Link to="/" className="font-bold text-xl text-[#01B5C5]">Lets Review!!</Link>
      <nav className="flex gap-4">
        <Link to="/books" className="text-[#01B5C5] text-xl">Books</Link>

        {user ? (
          <>
            {/* ✅ Admin-only Add Book link */}
            {user?.isAdmin && (
              <Link to="/admin/add-book" className="text-[#01B5C5] text-xl">Add Book</Link>
            )}

            <Link to="/profile" className="text-green-600 text-xl">{user?.name}</Link>
            <button onClick={handleLogout} className="text-white bg-[#fe0d0d] rounded-lg px-3 py-1">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-[#01B5C5] text-xl">Login</Link>
            <Link to="/register" className="text-[#01B5C5] text-xl">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
