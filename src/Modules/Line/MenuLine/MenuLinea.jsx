import React, {useContext, useEffect, useState} from 'react';

// context
import AppContext from '../../../context/AppContext';
import AppContextLinea from '../../../context/AppContextLinea';

// components:
import PaletaColor  from '../../../components/PaletaColor/PaletaColorSinTitle';
import PaletaGrosor from '../../../components/PaletaGrosor/PaletaGrosorSinTitle';

// styles:
import './MenuLinea.scss';
import CallMadeIcon from '@mui/icons-material/CallMade';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import UTurnRightIcon from '@mui/icons-material/UTurnRight';
import SwapCallsIcon from '@mui/icons-material/SwapCalls';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

import {Button, ButtonGroup} from "@mui/material";

const MenuLinea = () => {
	// useContext:
	const { state } = useContext(AppContext);
	const {
		stateLinea,
		s_lineSetType,
		s_lineSetSegment,
		h_lineaSetColorGrosor,
		h_lineaSetColor,
		h_lineaSetGrosor} = useContext(AppContextLinea);

	// USESTATE:
	const [variantLine, setVariantLine] = useState('outlined'); // variant: outlined, contained
	const [variantCuadratic, setVariantCuadratic] = useState('outlined'); // variant: outlined, contained
	const [variantBeziel, setVariantBeziel] = useState('outlined'); // variant: outlined, contained
	const [variantVector, setVariantVector] = useState('outlined'); // variant: outlined, contained

	const [variantSegmentFalse, setVariantSegmentFalse] = useState('outlined'); // variant: outlined, contained
	const [variantSegmentTrue, setVariantSegmentTrue] = useState('outlined'); // variant: outlined, contained

	// LOGICA:
	const iniciaBtnTypeLine = (value) => {
		setVariantLine('outlined');
		setVariantCuadratic('outlined');
		setVariantBeziel('outlined');
		setVariantVector('outlined');
		switch (value){
			case 'line':
				setVariantLine('contained');
				break;
			case 'cuadratic':
				setVariantCuadratic('contained');
				break;
			case 'bezier':
				setVariantBeziel('contained');
				break;
			case 'vector':
				setVariantVector('contained');
				break;
			default:
				break;
		}
	}
	const iniciaBtnSegmentLine = (boolean) => {
		setVariantSegmentTrue('outlined');
		setVariantSegmentFalse('outlined');
		switch (boolean) {
			case false:
				setVariantSegmentFalse('contained');
				break;
			case true:
				setVariantSegmentTrue('contained');
				break;
			default:
				break;
		}
	}
	const handleBtnTypeLine = (value) => {
		s_lineSetType(value);

		setVariantLine('outlined');
		setVariantCuadratic('outlined');
		setVariantBeziel('outlined');
		setVariantVector('outlined')
		switch (value){
			case 'line':
				setVariantLine('contained');
				break;
			case 'cuadratic':
				setVariantCuadratic('contained');
				break;
			case 'bezier':
				setVariantBeziel('contained');
				break;
			case 'vector':
				setVariantVector('contained');
				break;
			default:
				break;
		}
	}
	const handleBtnSegmentLine = (boolean) => {
		s_lineSetSegment(boolean);

		setVariantSegmentTrue('outlined');
		setVariantSegmentFalse('outlined');
		switch (boolean) {
			case false:
				setVariantSegmentFalse('contained');
				break;
			case true:
				setVariantSegmentTrue('contained');
				break;
			default:
				break;
		}
	}
	// LOGICA END.

	// useEffect:
	useEffect(() => {
		stateLinea.active ? h_lineaSetColor(state.color):'';
	}, [state.color]);

	useEffect(() => {
		stateLinea.active ? h_lineaSetGrosor(state.grosor):'';
	}, [state.grosor]);

	useEffect(() => {
		iniciaBtnTypeLine(stateLinea.type);
		iniciaBtnSegmentLine(stateLinea.segment);
		h_lineaSetColorGrosor(state.color, state.grosor);
	}, []);

	return (
		<article style={{display:'flex', justifyContent:'center', alignItems:'center', background:'white', padding:'5px 25px', borderRadius:'10px'}}>
			{<div style={{marginRight:'20px'}}><PaletaGrosor /></div>}
			<div style={{display:'flex', justifyContent:'center', alignItems:'center', marginRight:'20px'}}>
				<ButtonGroup
					aria-label="text formatting"
					size='small'
					color='primary'
				>
					<Button variant={variantLine} size='small' onClick={() => handleBtnTypeLine('line')}>
						<OpenInFullIcon fontSize='small'/>
					</Button>
					<Button variant={variantCuadratic} size='small' onClick={() => handleBtnTypeLine('cuadratic')}>
						<UTurnRightIcon fontSize='small'/>
					</Button>
					<Button variant={variantBeziel} size='small' disabled onClick={() => handleBtnTypeLine('bezier')}>
						<SwapCallsIcon fontSize='small'/>
					</Button>
					<Button variant={variantVector} size='small' onClick={() => handleBtnTypeLine('vector')}>
						<CallMadeIcon fontSize='small'/>
					</Button>
				</ButtonGroup>
			</div>
			<div style={{display:'flex', justifyContent:'center', alignItems:'center', marginRight:'20px'}}>
				<ButtonGroup
					aria-label="text formatting"
					size='small'
					color='primary'
				>
					<Button variant={variantSegmentFalse} color='primary' size='small' onClick={() => handleBtnSegmentLine(false)}><HorizontalRuleIcon fontSize='small'/></Button>
					<Button variant={variantSegmentTrue} color='primary' size='small' onClick={() => handleBtnSegmentLine(true)}><MoreHorizIcon fontSize='small'/></Button>
				</ButtonGroup>
			</div>
			{<PaletaColor tipo="linea" />}
		</article>
	);
};

export default MenuLinea;
