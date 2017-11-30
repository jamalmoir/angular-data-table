import angular from 'angular';
import { TotalController } from './TotalController';

export function TotalDirective($timeout){
  return {
    restrict: 'E',
    controller: TotalController,
    controllerAs: 'total',
    scope: true,
    bindToController: {
      options: '=',
      columns: '=',
      columnWidths: '=',
      onSort: '&',
      onResize: '&',
      onCheckboxChange: '&'
    },
    template: `
      <div class="dt-total" ng-style="total.styles()">

        <div class="dt-total-inner" ng-style="total.innerStyles()">
          <div class="dt-row-left"
               ng-style="total.stylesByGroup('left')"
               ng-if="total.columns['left'].length"
               sortable="total.options.reorderable"
               on-sortable-sort="columnsResorted(event, columnId)">
            <dt-total-cell
              ng-repeat="column in total.columns['left'] track by column.$id"
              on-checkbox-change="total.onCheckboxChanged()"
              on-sort="total.onSorted(column)"
              options="total.options"
              sort-type="total.options.sortType"
              on-resize="total.onResized(column, width)"
              selected="total.isSelected()"
              column="column">
            </dt-total-cell>
          </div>
          <div class="dt-row-center"
               sortable="total.options.reorderable"
               ng-style="total.stylesByGroup('center')"
               on-sortable-sort="columnsResorted(event, columnId)">
            <dt-total-cell
              ng-repeat="column in total.columns['center'] track by column.$id"
              on-checkbox-change="total.onCheckboxChanged()"
              on-sort="total.onSorted(column)"
              sort-type="total.options.sortType"
              selected="total.isSelected()"
              on-resize="total.onResized(column, width)"
              options="total.options"
              column="column">
            </dt-total-cell>
          </div>
          <div class="dt-row-right"
               ng-if="total.columns['right'].length"
               sortable="total.options.reorderable"
               ng-style="total.stylesByGroup('right')"
               on-sortable-sort="columnsResorted(event, columnId)">
            <dt-total-cell
              ng-repeat="column in total.columns['right'] track by column.$id"
              on-sort="total.onSorted(column)"
              sort-type="total.options.sortType"
              selected="total.isSelected()"
              on-resize="total.onResized(column, width)"
              options="total.options"
              column="column">
            </dt-total-cell>
          </div>
        </div>
        <div class="dt-total-inner" ng-style="total.innerStyles()">
          <div class="dt-row-left"
               ng-style="total.stylesByGroup('left')"
               ng-if="total.columns['left'].length"
               sortable="total.options.reorderable"
               on-sortable-sort="columnsResorted(event, columnId)">
            <dt-total-cell
              ng-repeat="column in total.columns['left'] track by column.$id"
              on-sort="total.onSorted(column)"
              options="total.options"
              sort-type="total.options.sortType"
              on-resize="total.onResized(column, width)"
              selected="total.isSelected()"
              column="column">
            </dt-total-cell>
          </div>
          <div class="dt-row-center"
               sortable="total.options.reorderable"
               ng-style="total.stylesByGroup('center')"
               on-sortable-sort="columnsResorted(event, columnId)">
            <dt-total-cell
              ng-repeat="column in total.columns['center'] track by column.$id"
              on-sort="total.onSorted(column)"
              sort-type="total.options.sortType"
              selected="total.isSelected()"
              on-resize="total.onResized(column, width)"
              options="total.options"
              column="column">
            </dt-total-cell>
          </div>
          <div class="dt-row-right"
               ng-if="total.columns['right'].length"
               sortable="total.options.reorderable"
               ng-style="total.stylesByGroup('right')"
               on-sortable-sort="columnsResorted(event, columnId)">
            <dt-total-cell
              ng-repeat="column in total.columns['right'] track by column.$id"
              on-sort="total.onSorted(column)"
              sort-type="total.options.sortType"
              selected="total.isSelected()"
              on-resize="total.onResized(column, width)"
              options="total.options"
              column="column">
            </dt-total-cell>
          </div>
        </div>
      </div>`,
    replace:true,
    link: function($scope, $elm, $attrs, ctrl){

      $scope.columnsResorted = function(event, columnId){
        var col = findColumnById(columnId),
            parent = angular.element(event.currentTarget),
            newIdx = -1;

        angular.forEach(parent.children(), (c, i) => {
          if (columnId === angular.element(c).attr('data-id')) {
            newIdx = i;
          }
        });

        $timeout(() => {
          angular.forEach(ctrl.columns, (group) => {
            var idx = group.indexOf(col);
            if(idx > -1){

              // this is tricky because we want to update the index
              // in the orig columns array instead of the grouped one
              var curColAtIdx = group[newIdx],
                  siblingIdx = ctrl.options.columns.indexOf(curColAtIdx),
                  curIdx = ctrl.options.columns.indexOf(col);

              ctrl.options.columns.splice(curIdx, 1);
              ctrl.options.columns.splice(siblingIdx, 0, col);

              return false;
            }
          });

        });
      }

      var findColumnById = function(columnId){
        var columns = ctrl.columns.left.concat(ctrl.columns.center).concat(ctrl.columns.right)
        return columns.find(function(c){
          return c.$id === columnId;
        })
      }
    }
  };
};
