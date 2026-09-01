import pool from '../../db/dbConfig';

class CmMenuModel {
  public async sideBarMenuList(): Promise<any[]> {
    const parentQuery = `SELECT id, title, shortdesc, description, url, perfil
FROM cm_menu  where status = 1`;
    const childQuery = `SELECT id, fk_idcm_menu, title, shortdesc, description, url, perfil FROM cm_menu_forms where status = 1 `;
    try {
      const [parentRows] = await pool.query(parentQuery);
      const [childrenRows] = await pool.query(childQuery);

      // Mapeo todo el menu padre para agregarle el array de hijos y filtro los hijos de cada padre por id de la fK

      const menuWithChildren = (parentRows as any[]).map((parent) => {
        const children = (childrenRows as any[]).filter(
          (child) => child.fk_idcm_menu === parent.id,
        );
        return {
          ...parent,
          subItems: children,
        };
      });

      return menuWithChildren;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      return [];
    }
  }

  public async fullMenuList(pageId?: number): Promise<any[]> {
    let Query = `SELECT id, title from menu_vw`;
    if (pageId) {
      Query += ` where fk_pageid = ${pageId}`;
    }


    try {
      const [rows] = await pool.query(Query);
      return rows as any[];
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      return [];
    }
  }
}

export default new CmMenuModel();
