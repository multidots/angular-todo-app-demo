// Todo controller for Manage task and task list

function TodoController($scope) {
    $scope.submitted = false;
    $scope.todoLists = JSON.parse(localStorage.getItem('todoLists'));
    $scope.selectall = (localStorage.getItem('selectAll') === 'true');
    if (!$scope.selectall) {
        $scope.selectall = false;
        localStorage.setItem('selectAll', false);
    }
    if (!$scope.todoLists) {
        $scope.todoLists = [];
    }
    $scope.addTask = function () {
        $scope.todoLists.push({ text: $scope.taskName, isChecked: false });
        localStorage.setItem('todoLists', JSON.stringify($scope.todoLists));
        $scope.taskName = '';
        $scope.submitted = false;
        $scope.selectall = false;
        localStorage.setItem('selectAll', false);
    };

    $scope.changeCheckBox = function () {
        if (!this.todoList.isChecked) {
            $scope.selectall = false;
        }
        $scope.ischeckAllSelected = false;
        var keepGoing = true;
        angular.forEach($scope.todoLists, function (value, key) {
            if (keepGoing) {
                if (!value.isChecked) {
                    $scope.ischeckAllSelected = true;
                    keepGoing = false;
                }
            }
        });
        if ($scope.ischeckAllSelected) {
            $scope.selectall = false;
        } else {
            $scope.selectall = true;
        }
        localStorage.setItem('selectAll', $scope.selectall);
        localStorage.setItem('todoLists', JSON.stringify($scope.todoLists));
    }

    $scope.selectallchange = function () {
        $scope.updateTaskList($scope.selectall);
        localStorage.setItem('selectAll', $scope.selectall);
    }

    $scope.updateTaskList = function (value) {
        $scope.todoLists.forEach(element => {
            element.isChecked = value;
        });
        localStorage.setItem('todoLists', JSON.stringify($scope.todoLists));
    }

    $scope.deleteTask = function () {
        $scope.deleteLists = [];
        var isdeleted = true;
        angular.forEach($scope.todoLists, function (value, key) {
            if (!value.isChecked) {
                $scope.deleteLists.push(value);
            } else {
                isdeleted = false;
            }
        });
        if (isdeleted) {
            alert('Please first checked Task to delete.');
        }
        $scope.todoLists = angular.copy($scope.deleteLists);
        localStorage.setItem('todoLists', JSON.stringify($scope.todoLists));
        $scope.selectall = false;
        localStorage.setItem('selectAll', false);
    }

}