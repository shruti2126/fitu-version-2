import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';

//const customData = require('./FinalHealthData.json');

type dataProps = {
	data_title?: string;
	nav_function?: () => void;
};

const mockData = [
	{
		Date: '10-jun-2019',
		steps: 263,
		distance: 0.003,
		weight: 143.5
	},
	{
		Date: '11-jun-2019',
		steps: 230,
		distance: 0.07,
		weight: 150
	}
];
//9803, 7926, 9012, 10256,10447, 10892
const line = {
	labels: [ 'Jan', 'Feb', 'Mar', 'Apr' ],
	datasets: [
		{
			data: [ 6704, 4033, 4572, 5633, 5148, 8077 ],
			strokeWidth: 2 // optional
		}
	]
};

const StepDataCard = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Annual Steps</Text>
			<ScrollView>
				<LineChart
					data={line}
					width={350} // from react-native
					height={350}
					//yAxisLabel={''}
					chartConfig={{
						backgroundColor: '#e26a00',
						backgroundGradientFrom: '#fb8c00',
						backgroundGradientTo: '#ffa726',
						decimalPlaces: 2, // optional, defaults to 2dp
						color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						style: {
							borderRadius: 16
						}
					}}
					bezier
					style={{
						marginVertical: 8,
						borderRadius: 16
					}}
				/>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginLeft: 10,
		marginRight: 10,
		backgroundColor: 'oldlace',
		borderRadius: 10,
		paddingLeft: 15,
		marginBottom: 7,
		marginTop: 10
	},
	title: {
		color: 'black',
		fontWeight: '700',
		fontSize: 32
	},
	item: {
		backgroundColor: '#ffe4c4',
		padding: 10,
		marginVertical: 8,
		marginHorizontal: 16,
		borderRadius: 10,
		fontSize: 15
	},
	header: {
		fontSize: 20,
		fontWeight: 'bold',
		backgroundColor: '#ffe4c4',
		padding: 10,
		marginVertical: 8,
		marginHorizontal: 16,
		borderRadius: 10
	},
	image: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
		width: '100%',
		height: '100%'
	},
	LineChart: {
		width: '80%'
	}
});

export default StepDataCard;
