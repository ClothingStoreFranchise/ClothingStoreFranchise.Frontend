export class NavItem {
  id?: number;
  parentId?: number;
  displayName: string;
  parentName?: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];

  constructor(name: string, parentName?: string, id?: number, parentId?: number, children?: NavItem[]) {
    this.displayName = name;
    this.parentName = parentName;
    this.id = id;
    this.parentId = parentId;
    this.children = children;

    if(parentId == null)
      this.route = "/catalog/"+name;
    else
      this.route = "/catalog/"+parentName+"/"+name+"/"+id;
  }
}
