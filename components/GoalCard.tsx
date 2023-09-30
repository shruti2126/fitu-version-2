import React from 'react';
import { View, StyleSheet, Text, Pressable, Image, FlatList, Button } from 'react-native';


type props = {
	updateGoal: Function;
	deleteGoal: Function;
	completeGoal: Function;
	index: number;
	isMainGoal: boolean;
	goalIsSteps: boolean;
	title: string;
	note: string | undefined;
};

export const GoalCard: React.FC<props> = ({
	updateGoal,
	deleteGoal,
	completeGoal,
	index,
	isMainGoal,
	goalIsSteps,
	title,
	note
}) => {
	// console.log(isMainGoal);
	// console.log(title);

	return (
		<View style={[ isMainGoal ? [ styles.mainGoalContainer, styles.shadow ] : styles.goalsContainer ]}>
			<Text style={styles.goalsTitle}>{title}</Text>
			<Text>{note}</Text>
			<Text>Main Goal? {isMainGoal ? 'Yes' : 'No'}</Text>

			<View style={styles.goalCardFooter}>
				<Pressable onPress={() => updateGoal(index, goalIsSteps)}>
					<Text style={styles.editButton}>Edit</Text>
				</Pressable>

				{/* deleteGoal(index, goalIsSteps) */}
				<Pressable onPress={() => deleteGoal(index, goalIsSteps)}>
					<Text style={styles.deleteButton}>Delete</Text>
				</Pressable>

				<Pressable onPress={() => completeGoal(index, goalIsSteps)}>
					<Text style={styles.completeButton}>Complete</Text>
				</Pressable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	goalsContainer: {
		marginLeft: 10,
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
		paddingLeft: 15,
		marginBottom: 7
	},
	mainGoalContainer: {
		marginLeft: 10,
		// backgroundColor: '#f194ff',
		borderWidth: 1,
		borderColor: '#f194ff',
		borderRadius: 10,
		paddingLeft: 15,
		marginBottom: 7
	},
	shadow: {
		shadowOffset: {
			width: 10,
			height: 8
		},
		shadowOpacity: 0.1,
		shadowRadius: 5
	},
	goalsTitle: {
		color: 'black',
		fontWeight: '700',
		fontSize: 25
	},
	editButton: {
		color: '#1E8CfB',
		marginRight: 20
	},
	deleteButton: {
		color: 'red',
		marginRight: 20
	},
	goalCardFooter: {
		flexDirection: 'row'
	},
	completeButton: {
		color: '#A7E556',
		marginRight: 20
	}
});

export default GoalCard;
