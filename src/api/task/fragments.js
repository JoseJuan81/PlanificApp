export const HIERARCHY_TASK_FRAGMENT = (gql) => gql`
	fragment hierarchyTaskFields on Task {
	budget {
		amount
		currencyCode
	}
	checkList {
		title
		done
	}
	comments
	expenses {
		amount
		currencyCode
		name
	}
	id
	labels
	name
	parentTask {
		id
	}
	relatedTask {
		condition
		task {
			id
			name
		}
	}
	spent
	time {
		endDate
		initDate
		duration
	}
  }
`;

export const FLATLIST_TASK_FRAGMENT = (gql) => gql`
  fragment flatListTaskField on Task {
    id
    name
  }
`;
