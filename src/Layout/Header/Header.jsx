import React, { useEffect, useContext, useState } from 'react';

// estilos:
import './Header.scss';

// containers:
import MenuHeader from './MenuHeader/MenuHeader';
import MenuPlano from '../../Modules/Plano/MenuPlano/MenuPlano';
import MenuMove  from '../../Modules/Move/MenuMove/MenuMove';
import MenuLapiz from '../../Modules/Pencil/MenuPencil/MenuLapiz';
import MenuEraser   from '../../Modules/Eraser/MenuEraser/MenuEraser';
import MenuCuadrado from '../../Modules/Square/MenuSquare/MenuCuadrado';
import MenuGrid     from '../../Modules/Grid/MenuGrid/MenuGrid';
import MenuLinea    from '../../Modules/Line/MenuLine/MenuLinea';
import MenuText from '../../Modules/Text/MenuText/MenuText';
import MenuCirculo from "../../Modules/Circle/MenuCircle/MenuCirculo";
import MenuTriangulo from "../../Modules/Triangle/MenuTriangle/MenuTriangulo";
import MenuImagen_   from "../../Modules/Image/MenuImage/MenuImagen";
import MenuFunction  from "../../Modules/Function/MenuFunction/MenuFunction";
import MenuCalculadora from "../../Modules/Calculator/MenuCalculadora/MenuCalculadora";
import MenuGeometric from "../../Modules/Geometric/MenuGeomtric/MenuGeometric";
import MenuScissor   from "../../Modules/Scissor/MenuScissor/MenuScissor";

// context:
import AppContext from '../../context/AppContext';
import {AppBar, Toolbar, Typography} from "@mui/material";

import {makeStyles} from "@mui/styles";
import { styled }   from '@mui/material/styles';
import MenuReadJson from "../../Modules/ReadJson/MenuReadJson/MenuReadJson";
const useStyle = makeStyles(theme => ({
	// offset: theme.mixins.toolbar
	toolbar: {
		display: 'flex',
		justifyContent: "space-between"
	}
}));

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const Header = () => {
	// CONTEXT:
	const { state } = useContext(AppContext);

	// STATE:
	const [toggleMenuHeader, setToggleMenuHeader] = useState(false);
	const [toggleMenuMover, setToggleMenuMover] = useState(false);
	const [toggleMenuLapiz, setToggleMenuLapiz] = useState(false);
	const [toggleMenuBorrador, setToggleMenuBorrador] = useState(false);
	const [toggleMenuCuadrado, setToggleMenuCuadrado] = useState(false);
	const [toggleMenuCuadricula, setToggleMenuCuadricula] = useState(false);
	const [toggleMenuLinea, setToggleMenuLinea] = useState(false);
	const [toggleMenuPlano, setToggleMenuPlano] = useState(false);
	const [toggleMenuText, setToggleMenuText] = useState(false);
	const [toggleMenuCirculo, setToggleMenuCirculo] = useState(false);
	const [toggleMenuTriangulo, setToggleMenuTriangulo] = useState(false);
	const [toggleMenuImagen, setToggleMenuImagen] = useState(false);
	const [toggleMenuFunction, setToggleMenuFunction] = useState(false);
	const [toggleMenuCalculadora, setToggleMenuCalculadora] = useState(false);
	const [toggleMenuGeometric, setToggleMenuGeometric] = useState(false);
	const [toggleMenuScissor, setToggleMenuScissor] = useState(false);
	const [toggleMenuReadJson, setToggleMenuReadJson] = useState(false);

	// LOGICA:
	const classes = useStyle();

	// useEffect:
	useEffect(() => {
		setToggleMenuHeader(false);
		setToggleMenuMover(false);
		setToggleMenuLapiz(false);
		setToggleMenuBorrador(false);
		setToggleMenuCuadrado(false);
		setToggleMenuCuadricula(false);
		setToggleMenuLinea(false);
		setToggleMenuPlano(false);
		setToggleMenuText(false);
		setToggleMenuCirculo(false);
		setToggleMenuTriangulo(false);
		setToggleMenuImagen(false);
		setToggleMenuFunction(false);
		setToggleMenuCalculadora(false);
		setToggleMenuGeometric(false);
		setToggleMenuScissor(false);
		setToggleMenuReadJson(false);
		switch (state.active) {
			case 'homeIcon':
				setToggleMenuHeader(true);
				break;
			case 'moverIcon':
				setToggleMenuMover(true);
				break;
			case 'lapizIcon':
				setToggleMenuLapiz(true);
				break;
			case 'borradorIcon':
				setToggleMenuBorrador(true);
				break;
			case 'cuadradoIcon':
				setToggleMenuCuadrado(true);
				break;
			case 'lineaIcon':
				setToggleMenuLinea(true);
				break;
			case 'planoIcon':
				setToggleMenuPlano(true);
				break;
			case 'cuadriculaIcon':
				setToggleMenuCuadricula(true);
				break;
			case 'textIcon':
				setToggleMenuText(true);
				break;
			case 'circuloIcon':
				setToggleMenuCirculo(true);
				break;
			case 'trianguloIcon':
				setToggleMenuTriangulo(true);
				break;
			case 'imagenIcon':
				setToggleMenuImagen(true);
				break;
			case 'functionIcon':
				setToggleMenuFunction(true);
				break;
			case 'calculadoraIcon':
				setToggleMenuCalculadora(true);
				break;
			case 'geometricIcon':
				setToggleMenuGeometric(true);
				break;
			case 'scissorIcon':
				setToggleMenuScissor(true);
				break;
			case 'readJsonIcon':
				setToggleMenuReadJson(true);
				break;
			default:
				setToggleMenuHeader(true);
				break;
		}
	}, [state]);
	return (
		<>
			<div>
				<AppBar>
					<Toolbar className={classes.toolbar}>
						<Typography  variant='h7'>
							<a href="/" style={{ textDecoration: 'none', color: 'white' }}>MATHBOARD</a>
						</Typography>
						<div>
							{toggleMenuHeader && <MenuHeader />}
							{toggleMenuPlano && <MenuPlano />}
							{toggleMenuMover && <MenuMove />}
							{toggleMenuLapiz && <MenuLapiz />}
							{toggleMenuBorrador && <MenuEraser />}
							{toggleMenuCuadrado && <MenuCuadrado />}
							{toggleMenuCuadricula && <MenuGrid />}
							{toggleMenuLinea && <MenuLinea />}
							{toggleMenuText && <MenuText />}
							{toggleMenuCirculo && <MenuCirculo />}
							{toggleMenuTriangulo && <MenuTriangulo />}
							{toggleMenuImagen && <MenuImagen_ />}
							{toggleMenuFunction && <MenuFunction />}
							{toggleMenuCalculadora && <MenuCalculadora />}
							{toggleMenuGeometric && <MenuGeometric />}
							{toggleMenuScissor && <MenuScissor/>}
							{toggleMenuReadJson && <MenuReadJson/>}
						</div>
						<Typography  variant='h7' style={{ color: 'white'}}>
							UMSA / INFORMÁTICA
						</Typography>
					</Toolbar>
				</AppBar>
				<Offset />
			</div>
		</>
	);
};

export default Header;
