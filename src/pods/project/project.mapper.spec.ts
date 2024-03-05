import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';
import * as projectMapper from './project.mapper';

describe('pods/project/project.mapper.ts specs', () => {
  describe('Map Project from Api-Model to View-Model', () => {
    it.each<apiModel.Project>([null, undefined])(
      'Should return an empty project when is fed with %p value',
      (project: any) => {
        // Arrange
        const emptyProject: apiModel.Project = {
          id: '',
          name: '',
          externalId: '',
          comments: '',
          isActive: false,
          employees: [],
        };
        const getStub = jest.spyOn(viewModel, 'createEmptyProject');

        // Act
        const result: viewModel.Project =
          projectMapper.mapProjectFromApiToVm(project);

        // Assert
        expect(getStub).toHaveBeenCalled();
        expect(result).toEqual(emptyProject);
      }
    );

    it('Should return a -view model project- when is fed with a complete -api-model project-', () => {
      // Arrange
      const mockApiProject: apiModel.Project = {
        id: '1',
        name: 'Custom Project',
        externalId: '1',
        comments: 'Mocked comments',
        isActive: true,
        employees: [],
      };
      // Act
      const result: viewModel.Project =
        projectMapper.mapProjectFromApiToVm(mockApiProject);

      // Assert
      expect(result).toEqual({
        id: '1',
        name: 'Custom Project',
        externalId: '1',
        comments: 'Mocked comments',
        isActive: true,
        employees: [],
      });
    });
  });

  describe('Map Employee SummaryList from Api-Model to View-Model', () => {
    it.each<apiModel.EmployeeSummary | []>([null, undefined, []])(
      'Should return [], when is fed with %p',
      (summary: any) => {
        // Act
        const result = projectMapper.mapEmployeeSummaryListFromApiToVm(summary);

        // Assert
        expect(result).toEqual([]);
      }
    );

    it('Should return a complete view-model-EmployeeSumary when fed with api-model-Summary', ()=>{
      // Arrange
      const apiSummary:apiModel.EmployeeSummary[] = [{
        id: "1",
        isAssigned: true,
        employeeName: "Jane Doe",
      }]
      const expectedResult:viewModel.EmployeeSummary[] = [{
        id: "1",
        isAssigned: true,
        employeeName: "Jane Doe",
      }]

      // Act
      const result:viewModel.EmployeeSummary[] = projectMapper.mapEmployeeSummaryListFromApiToVm(apiSummary)

      // Assert
      expect(result).toEqual(expectedResult)
    })
  });
});
