import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SearchPage from './SearchPage';

const settings = ['Profile', 'Logout'];

function ResponsiveAppBar({ favorites, setFavorites  }) {

	const addToFavorites = (dog) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.some(fav => fav.id === dog.id)) {
        return [...prevFavorites, dog];
      }
      return prevFavorites;
    });
  };

  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

	const handleCloseNavMenu = (page) => {
    if (page === 'Favorites') {
      navigate('/favorites');
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <>
			<AppBar position="static">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Typography
							variant="h6"
							noWrap
							component="a"
							href="#app-bar-with-responsive-menu"
							sx={{
								mr: 2,
								display: { xs: 'none', md: 'flex' },
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.3rem',
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							🐶 Pawfect Match
						</Typography>

						<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
							<Button onClick={() => handleCloseNavMenu('Favorites')} sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                ❤️ Favorites <span style={{ background: 'pink', color: 'white', padding: '2px 6px', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 'bold' }}>+ {favorites.length}</span>
              </Button>
						</Box>

						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: '45px' }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{settings.map((setting) => (
									<MenuItem key={setting} onClick={handleCloseUserMenu}>
										<Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
			<SearchPage	addToFavorites={addToFavorites} />
		</>
  );
}

ResponsiveAppBar.propTypes = {
	favorites: PropTypes.array.isRequired,
	setFavorites: PropTypes.func.isRequired,
	addToFavorites: PropTypes.func.isRequired,
};


export default ResponsiveAppBar;