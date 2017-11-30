import angular from 'angular';
import { TotalCellController } from './TotalCellController';

export function TotalCellDirective($compile){
  return {
    restrict: 'E',
    controller: TotalCellController,
    controllerAs: 'tcell',
    scope: true,
    bindToController: {
      options: '=',
      column: '=',
      onCheckboxChange: '&',
      onSort: '&',
      sortType: '=',
      onResize: '&',
      selected: '=',
    },
    replace: true,
    template:
      `<div ng-class="tcell.cellClass()"
            class="dt-total-cell"
            draggable="true"
            data-id="{{column.$id}}"
            ng-style="tcell.styles()"
            title="{{::tcell.column.total}}">
        <div resizable="tcell.column.resizable"
             on-resize="tcell.onResized(width, tcell.column)"
             min-width="tcell.column.minWidth"
             max-width="tcell.column.maxWidth">
          <span class="dt-total-cell-label">
          </span>
        </div>
      </div>`,
    compile: function() {
      return {
        pre: function($scope, $elm, $attrs, ctrl) {
          let label = $elm[0].querySelector('.dt-total-cell-label'), cellScope;

          if(ctrl.column.totalRenderer){
            cellScope = ctrl.options.$outer.$new(false);

            // copy some props
            cellScope.$total = ctrl.column.total;
            cellScope.$index = $scope.$index;
          }

          if(ctrl.column.totalRenderer){
            let elm = angular.element(ctrl.column.totalRenderer($elm));
            angular.element(label).append($compile(elm)(cellScope)[0]);
          } else {
            let val = ctrl.column.total;
            if(val === undefined || val === null) val = '';
            label.textContent = val;
          }
        }
      }
    }
  };
};
