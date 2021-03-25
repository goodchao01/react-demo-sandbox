import React, { Suspense } from 'react'
import { Route, Link } from 'react-router-dom'

const CustomHook = React.lazy(() => import('./CustomHook'))
const Tree = React.lazy(() => import('./Tree'))

export default function Demos(props) {
	const { match: { path }, history } = props
	return <Suspense>
		<Route exact path={path} children={({ match }) => match && <DemosIndex path={path} />} />
		<Route exact path={`${path}/CustomHook`} children={({ match }) => match && <CustomHook />} />
		<Route exact path={`${path}/Tree`} children={({ match }) => match && <Tree />} />
	</Suspense>
}

const DemosIndex = ({ path }) => (
	<>
		<Link to={`${path}/CustomHook`}>CustomHook</Link>
		<br />
		<Link to={`${path}/Tree`}>Tree</Link>
	</>
)