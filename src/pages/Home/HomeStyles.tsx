import { styled } from '@mui/system';

export const RootContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    '@media (max-width: 1050px)': { // Aplica estilos quando a largura da tela é no máximo 1050px
        justifyContent: 'start',
    },
    
});

export const Container = styled('div')({
    display: 'flex',
    width: '80%',
    justifyContent: 'space-between',
    '@media (max-width: 1400px)': {
        width: '100%',
    },

});

export const SectionLeft = styled('div')({
    flex: 1,
    marginTop: 23,
    marginRight: 15,
    marginLeft: 15,
    maxWidth: '22%',
    '& > *:not(:last-child)': { // Aplica estilo a todos os filhos, exceto o último
        marginBottom: 15,
    },
    '@media (max-width: 1050px)': { // Aplica estilos quando a largura da tela é no máximo 1050px
        display: 'none', // Oculta a seção quando a largura da tela é menor ou igual a 1050px
    },
}); 

export const SectionRight = styled('div')({
    flex: 1,
    marginTop: 23,
    marginRight: 15,
    marginLeft: 15,
    maxWidth: '22%',
    '& > *:not(:last-child)': { // Aplica estilo a todos os filhos, exceto o último
        marginBottom: 15,
    },
    '@media (max-width: 1050px)': { // Aplica estilos quando a largura da tela é no máximo 1050px
        maxWidth: '30%',
    },
    '@media (max-width: 800px)': { // Aplica estilos quando a largura da tela é no máximo 1050px
        display: 'none',
    },
}); 

export const MainSection = styled('div')({
    flex: 1,
    '@media (max-width: 1050px)': { // Aplica estilos quando a largura da tela é no máximo 1050px
        paddingLeft: 10,
    },
    '@media (max-width: 800px)': { // Aplica estilos quando a largura da tela é no máximo 1050px
        paddingRight: 10,
    },
    
});

export const BorderBottom = styled('div')({
    borderBottom: '1.8px solid #323d45',
    width: '100%',
    marginTop: 2,
});


