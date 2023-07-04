import React, { useEffect, useState } from "react";
import "./Profile.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../State/authSlice";
import { useNavigate } from "react-router-dom";
function Profile() {

  const user = useSelector(state => state.user);
  const {firstName, lastName, email} = user;
  const dispatch = useDispatch();
  const navigate = useNavigate();
	const Menu = () => {
		const [isMenuOpen, setIsMenuOpen] = useState(false);
		const handleScreenClick = () => {
			setIsMenuOpen(false);
		};

		useEffect(() => {
			document.addEventListener("click", handleScreenClick);

			return () => {
				document.removeEventListener("click", handleScreenClick);
			};
		}, []);

		const handleToggleMenu = (e) => {
			e.stopPropagation(); // Prevent the screen click event from triggering

			setIsMenuOpen((prevState) => !prevState);
		};

		const handleMenuItemClick = () => {
			dispatch(setLogout());
      navigate("/");
		};

		return (
			<div style={{ position: "relative" }}>
				<IconButton className="menu-icon" onClick={handleToggleMenu}>
					<MoreVertIcon/>
				</IconButton>

				{isMenuOpen && (
					<div className="menu m-8 px-2" style={{ position: "absolute", top: "-100%" }}>
						<div
							className="menu_item"
						>
							{email}
						</div>
						<div
							className="menu_item cursor-pointer hover:bg-gray-200"
							onClick={handleMenuItemClick}
						>
							Log Out
						</div>
					</div>
				)}
			</div>
		);
	};
	return (
		<div  className="flex profile mx-1">
			<div className="flex justify-center items-center">
				<h1 >{`${firstName[0]+lastName[0]}`}</h1>
			</div>
			<div className="profile__name">{`${firstName} ${lastName}`}</div>
			<Menu />
		</div>
	);
}

export default Profile;
